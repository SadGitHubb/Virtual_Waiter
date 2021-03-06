import db from "../../back-end/firebaseConnect"
import { collection, getDocs} from 'firebase/firestore'

export const get = (collectionName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const querySnapshot = await getDocs(collection(db, collectionName))
            let registros = []
            querySnapshot.forEach((item) => {
                let data = item.data()
                data.key = item.id
                registros.push(data)
            })
            resolve(registros)
        } catch (error) {
            console.log("Erro:", error)
            reject()
        }
    })
}