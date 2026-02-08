export const getUsers = async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users') //llamado de API
    if (!res.ok) throw new Error('Error al obtener usuarios')

    const data = await res.json()
    const users = data.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone
    }))

    return users
  } catch (error) {
    console.error(error)
    return []
  }
}