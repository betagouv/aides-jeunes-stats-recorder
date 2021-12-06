## Cette documentation est technique. Pour plus d'informations sur le [simulateur d'aides pour les jeunes](https://mes-aides.1jeune1solution.beta.gouv.fr), regardez notre [wiki](https://github.com/betagouv/aides-jeunes/wiki).

> Le serveur de statistiques du [simulateur d'aides et de prestations sociales pour les jeunes](https://mes-aides.1jeune1solution.beta.gouv.fr), en parallèle de Matomo. Les résultats sont accessibles depuis le site [https://betagouv.github.io/mes-aides-analytics/](https://betagouv.github.io/mes-aides-analytics/)

# Setup

## Stack

- [ExpressJS](https://www.npmjs.com/package/express)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [body-parser](https://www.npmjs.com/package/body-parser)

# Installation

Une fois le repository récupéré, il suffit d'exécuter les commandes suivantes :

```bash
npm install
npm start
```

Le serveur devrait est accessible par défaut sur [`localhost:4000`](http://localhost:4000/)

Davantage de commandes liées au développement sont accessible dans le `package.json`.

# Ajout de records

Pour pouvoir ajouter des records servant à établir des statistiques, le client doit envoyer une requête `POST` à l'url `http://localhost:4000/benefits`.

Les paramètres à remplir sont les suivants :

| Paramètre             | Description                                                                                                             |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------|
| benefit_id            | L'identifiant de l'aide                                                                                                 |
| hash_id               | Un identifiant permettant de reconnaitre l'utilisateur. Par défaut l'id Matomo.                                         |
| benefit_page_position | La position de l'aide affichée sur la page de résultat                                                                  |
| benefits_page_total   | Le nombre total d'aides affichées sur la page de résultat                                                               |
| event_type            | Le type d'évènement : "display" lorsque l'aide est affichée à l'utilisateur, "clicked" lorsque celui-ci a cliqué dessus |


Pour effectuer des tests, on peut faire une requête `curl` depuis un terminal:
```bash
curl -v -X POST \
  -H 'Content-Type: application/json' \
  -d '{"benefit_id": "RSA", "hash_id": "xxxxxxxxx", "benefit_page_position": 4, "benefits_page_total": 10, "event_type": "display" }' \
  http://localhost:4000/benefits
```

Pour ne pas avoir à effectuer autant de requêtes qu'il y a d'aides par page, on peut également envoyer plusieurs records à la fois :
```bash
curl -v -X POST \
  -H 'Content-Type: application/json' \
  -d '[{"benefit_id": "RSA", "hash_id": "xxxxxxxxx", "benefit_page_position": 1, "benefits_page_total": 2, "event_type": "display" }, {"benefit_id": "Livret d’épargne populaire", "hash_id": "xxxxxxxxx", "benefit_page_position": 2, "benefits_page_total": 2, "event_type": "display" }]' \
  http://localhost:4000/benefits
```