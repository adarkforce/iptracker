import React, { useRef, useState } from 'react'
import publicIp from 'react-public-ip'



const API_KEY = process.env.REACT_APP_API_KEY
const domainRegex = '^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})$'
const ipV4Regex = '^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$'
const ipV6Regex = '(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))'


export default function useIpfy() {

    const [queryString, setQuery] = useState();
    const [ipInfos, setIpInfos] = useState()
    const [loading, isLoading] = useState(false)
    const [error, setError] = useState()
    const [domainChecker] = useState(() => new RegExp(domainRegex))
    const [ipV4Checher] = useState(() => new RegExp(ipV4Regex))
    const [ipV6Checher] = useState(() => new RegExp(ipV6Regex))

    React.useEffect(() => {
        publicIp.v4()
            .then((res) => {
                if (res)
                    setQuery(res)
            })
            .catch(() => {
                setQuery(undefined)
            })
    }, [])

    React.useEffect(() => {
        queryString && fetchQuery(queryString)
    }, [queryString])

    const fetchQuery = (query) => {
        if (ipV4Checher.test(query) || ipV6Checher.test(query)) {
            fetchIp(query)
            return
        }
        if (domainChecker.test(query)) {
            fetchDomain(query)
            return
        }
        setError('Invalid Address or Domain');

    }

    const fetchIp = (ip) => {
        isLoading(true)
        setError(undefined)
        setIpInfos(undefined)
        fetch(`https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${ip}`)
            .then(res => res.json())
            .then((resJson) => {
                if (resJson.messages) {
                    setError(undefined)
                    if (resJson.code === 400)
                        setError({ messages: 'Invalid Query' })
                    else
                        setError(resJson)
                    console.log(error)
                    return
                }
                setIpInfos(resJson)
                console.log(resJson)
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                isLoading(false)
            })
    }

    const fetchDomain = (domain) => {
        isLoading(true)
        setError(undefined)
        setIpInfos(undefined)
        fetch(`https://geo.ipify.org/api/v1?apiKey=${API_KEY}&domain=${domain}`)
            .then(res => res.json())
            .then((resJson) => {
                if (resJson.messages) {
                    setError(undefined)
                    if (resJson.code === 400)
                        setError({ messages: 'Invalid Query' })
                    else
                        setError(resJson)
                    console.log(error)
                    return
                }
                setIpInfos(resJson)
                console.log(resJson)
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                isLoading(false)
            })
    }

    const search = (ip) => {
        setQuery(ip)
    }

    return [ipInfos, search, loading, error];
}