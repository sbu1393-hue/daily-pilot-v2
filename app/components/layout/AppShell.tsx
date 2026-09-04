import Header from "../Header";


function AppShell({
children
}:{
children:React.ReactNode
}){


return (

<div className="app-bg">


<Header/>


<main className="app-container">

{children}

</main>


</div>


)

}


export default AppShell;