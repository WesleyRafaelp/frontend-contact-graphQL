import ContactForm from "@/components/form";
import ListContacts from "@/components/list-contacts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center xl:flex-row xl:items-start xl:justify-between px-4">
      <section className="min-w-fit">
        <ContactForm/>
      </section>
      <section>
        <ListContacts/>
      </section>
    </main>
  )
}
