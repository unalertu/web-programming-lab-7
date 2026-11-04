const demoUsername = '240408016@st.biruni.edu.tr'
const demoPassword = 'demo123456'

export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === demoUsername && password === demoPassword) {
        resolve({ username })
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 500)
  })
}
