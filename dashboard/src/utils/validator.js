export function validateEmptyAndLength3(value) {
  if (!value) {
    return 'Este campo é obrigatório'
  }

  if (value.length < 3) {
    return '*Este campo precisa de no minimo 3 caracteres'
  }

  return true
}

export function validateEmptyAndEmail(value) {
  if (!value) {
    return 'Este campo é obrigatório'
  }

  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)

  if (!isValid) {
    return '*E-mail invalido'
  }

  return true
}
