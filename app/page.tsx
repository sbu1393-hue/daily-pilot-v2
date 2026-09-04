import Hero from "@/app/components/landing/Hero"
import DashboardPreview from "@/app/components/landing/DashboardPreview"
import Features from "@/app/components/landing/Features"
import CTASection from "@/app/components/landing/CTASection"
import styles from "../app/components/landing/landing.module.css"



export default function Home(){


    return (

        <main className={styles.landingPage}>


            <Hero/>

            <DashboardPreview/>

            <Features/>

            <CTASection/>


        </main>

    )

}