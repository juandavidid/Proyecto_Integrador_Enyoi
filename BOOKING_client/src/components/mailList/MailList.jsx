import './mailList.css'

// Funcion Componente
const MailList = () => {
    return (
        <div className="mail">
            <h1 className="mailTitle">Save time, save money!</h1>
            <span className="mailDesc">Sign up and we'll send the deals to you</span>
            <div className="mailInputContainer">
                <input type="text" placeholder="Yoyr Email" />
                <button>Subcribe</button>

            </div>
        </div>
    )
}
export default MailList;