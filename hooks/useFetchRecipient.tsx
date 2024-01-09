import { useEffect, useState } from "react"
import { BaseURL, getRequest } from "../services"
import axios from "axios"

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null)
    const [error, seterror] = useState(null)

    const recipientId = chat?.members?.find((id) => id !== user?._id)


    useEffect(() => {
        const getUser = async () => {
            try {

                if (!recipientId) return null
                const form = `${BaseURL}/api/v1/user/find-user/${recipientId}`
                const response = await axios.get(form)
                setRecipientUser(response.data.data)

            } catch (error) {
                console.log(error);
                seterror(error)

            }

        }
        getUser()
    }, [])

    return { recipientUser }
}