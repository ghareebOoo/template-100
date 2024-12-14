import useOnlineStatement from "../hooks/useOnlineStatement";


export default function Offline({children}) {
    let isOnline = useOnlineStatement()
    if(!isOnline) return children
}
