import axios from "axios";
import * as lod from 'lodash';

const domain = 'allollal.amocrm.ru'
const accID = 31235942
const access = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlmOWM0YjFhYzFiNGZkZDdkYzg1ZWE0OTBjMjZkMGNmZGFkYzQ0OTY0YjUxMzMzOTkwOTcyOTI0MTEzYzNjYjUzYmY3ZGIxOTBjOTAzZjdlIn0.eyJhdWQiOiJjOWQwOTc1MS00MDllLTQyNDEtOTNiNi1jNDFjYTJjY2JhZTQiLCJqdGkiOiI5ZjljNGIxYWMxYjRmZGQ3ZGM4NWVhNDkwYzI2ZDBjZmRhZGM0NDk2NGI1MTMzMzk5MDk3MjkyNDExM2MzY2I1M2JmN2RiMTkwYzkwM2Y3ZSIsImlhdCI6MTY5MjM0NDgyMCwibmJmIjoxNjkyMzQ0ODIwLCJleHAiOjE2OTI0MzEyMjAsInN1YiI6Ijk5NjEzMDIiLCJncmFudF90eXBlIjoiIiwiYWNjb3VudF9pZCI6MzEyMzU5NDIsImJhc2VfZG9tYWluIjoiYW1vY3JtLnJ1IiwidmVyc2lvbiI6InYyIiwic2NvcGVzIjpbInB1c2hfbm90aWZpY2F0aW9ucyIsImZpbGVzIiwiY3JtIiwiZmlsZXNfZGVsZXRlIiwibm90aWZpY2F0aW9ucyJdfQ.bF4ZdK0w2zWpj3Tlyfj_GrexJNsAjpW2xxGTNyiAVp0wOzT6fKYsFwz7rjbCqjQT_p74gXlU-F6H-sVyFesgwNlTKWL5j9ZICTuvb8w5xF0GasYscbx8-36hs22z9Zff5B1fzsHekExCoFQ0ntb6GWTuqfVFI0h8qUPCNNiamJ1cE_BycgB9sN5gh1db22k8sQ2L7x_G0C4hI9XidkW5J5oRd_Nk-2_K045XeFKmWzFvcKNAtGuIf08iqeEXkXTuIYtgG8voJCU_-desgV97KIm6eNjqWYOhbOUoaxasywRqZOxZBlHIojSIMKbgvElhBeaKBH4NMXdh9cypNjsQFQ'

// AMOCRM.constant('amomail).auth_token
const mailToken = 'MTpObUxjYk9jL1Z4NzRVSUZIZHR0WmNYUlcrSHdndW1uOTFOOHJJRUJKejcwPTo5MWU2NTE0NDNlM2QwYzdlOWRjMGU2NWEzOWEzNDBkMGQzMDgzOWFjYjdkNDYyZDIwYzY2OWY0NDExM2ZiMGM1OjMxMjM1OTQyOjk5NjEzMDI6N2ZwNmg5amZ2bzVyZGFpb24zdW1tY2pvbnU'


// инстанс для работы с публичным api  
const publicApi = axios.create({
    baseURL: `https://${domain}/api/v4`,
    headers: {
        "Authorization": `Bearer ${access}`,
        "Content-Type": "application/json; charset=UTF-8",
    },
}) 

// инстанс для работы с приватным api  
const privateApi = axios.create({
    baseURL: `https://${domain}`,
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
    },
})

// инстанс для работы с amomail api  
const amoMailApi = axios.create({
    baseURL: `https://amomail.amocrm.ru/api/v2/${accID}`,
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        "X-Auth-Token": mailToken,
    }
})

const GrantType = {
    AuthCode: 'authorization_code',
    RefreshToken: 'refresh_token',
}
const getAuthToken = async (token, type=GrantType.AuthCode) => {
    const payload = {
        client_id: 'c9d09751-409e-4241-93b6-c41ca2ccbae4',
        client_secret: 'tc5tMIR6UfpJGGbVuU8Tw7s0tQ9kwdKlLzw7cEUE8CBlPuhGZcAtKcVYcfL5sMT5',
        redirect_uri: 'https://localhost',
        grant_type: type,
        [type === GrantType.AuthCode ? 'code' : 'refresh_token']: token
    }
    const headers = {
        headers: {
            "Content-Type": 'application/json'
        }
    }
    const { data } = await axios.post(
        `https://${domain}/oauth2/access_token`, 
        {
            client_id: 'c9d09751-409e-4241-93b6-c41ca2ccbae4',
            client_secret: 'tc5tMIR6UfpJGGbVuU8Tw7s0tQ9kwdKlLzw7cEUE8CBlPuhGZcAtKcVYcfL5sMT5',
            redirect_uri: 'https://localhost',
            grant_type: type,
            [type === GrantType.AuthCode ? 'code' : 'refresh_token']: token
        }, 
        {
            headers: {
                "Content-Type": 'application/json'
            }
        }
    )
    console.log(data)
}

;(async ()  => {
    try {
        await getAuthToken('def50200814bfd0005590f89feb7cf79a3cb3a309775099c662c32185c94809e1cbcd7b5b4026eaea83a0a83c3384fa09781846233a5652d3c08b2e3b0bee11f1b4f67b0209256da973b5574db42c9f85e050fdc4212d62c1e525faed34af7ab16b725fc4c0e5e38c21aad61a1753d625c69afdf2581e69900fe627f9702f125738592490603d5354a23ffb2fa1baef3a4be4514aae2076ff58320ca5cb6c42fbc711debce4aa9aca6100dbc8da0900ce2f8edebfb6e7a7bb5fdf4b59dc613f7c9000c5533219c7d44830d0a44c1f4d1013137c70aa0105085c08a500cbdc711fcf1196417df10015e75995cc52a46e1a30bcd4ced1b7b04b4afeecacb8abde6021a18f4f1432033d14e9b2ee42898fce890a7add5ba1a9ef9d66f60b9d35c038a351451596609bd97422d77c8170e33533fed5426facf2dccf0a6dbd0ef8dca339f9916c981d61de8bfcea6c87f3a68ecd9380db47a04c0be567e0d76c2227575b029af36a97aab0e0125d3389d3c4818d397df974aea9845d8cb90840e0a211dde73df469b617995faa803f53e5defe937747e119b39900262625bda8ee4ef6cc35c0462e3d63c9eb81436ccdff79eb5043775375fb389688fa553b6798632719b570b600737236ea64e989b2b261b66594af5aa92db25abe1c0bb56bfb5f9d6')
        // console.log(data);
    } catch (error) {
        console.error(error);
        // console.error(lod.get(error, 'response.data', null))
    }
})()