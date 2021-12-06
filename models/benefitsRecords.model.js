module.exports = {
  get(benefitId) {
    return {
      benefit_id: benefitId,
    }
  },
  create(benefitRecord) {
    return benefitRecord
  },
  update(benefitId, benefitRecord) {
    return benefitRecord
  },
  delete(benefitId) {
    return true
  },
}
