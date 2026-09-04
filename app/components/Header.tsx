import Logo from "./Logo";


export default function Header(){

return (

<header className="app-header">

<div className="header-inner">


<Logo />


<div className="header-actions">

<button className="search-box">

🔍
<span>
Search anything...
</span>

</button>


<button className="icon-btn">
🔔
</button>


<button className="avatar">
👨‍💻
</button>


</div>


</div>

</header>

)

}