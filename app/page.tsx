export default function Home() {
  return (
    <main className="flex flex-col items-center p-10 sm:p-24 light:bg-gray-50 dark:bg-gray-900">
      <h1 className="w-full mb-6 text-2xl font-bold text-center light:text-gray-800 dark:text-gray-100">
        Achtung!! Bitte schaut vor eurer Bestellung auf der Mozartseite
      </h1>

      <section className="w-full max-w-2xl mb-8">
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Hallo zusammen, es ist endlich soweit: unsere hmmh gebrandeten Hoodies
          sind da! Diese Hoodies stammen von Stanley Stella, einem belgischen
          Anbieter von nachhaltiger und fairer Kleidung. Sie bestehen aus
          Bio-Baumwolle und werden mit 100% Öko-Strom produziert, was den
          CO₂-Ausstoß um bis zu 94% reduziert. Alle Textilien von Stanley Stella
          sind ökologisch und fair zertifiziert.
        </p>

        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Zum Design: Die Hoodies sind schlicht und einfarbig, mit einem
          dezenten Stick auf der Brust und am Ärmel. Ein Bild dazu findet ihr
          weiter oben!
        </p>

        <p className="mb-4 text-gray-700 dark:text-gray-300">
          In der Umfrage könnt ihr eure Wunschfarbe auswählen. Die Farbauswahl
          findet ihr auf der{" "}
          <a
            href="https://mozart.hmmh.ag/display/PDEV/hmmh+Hoodie+Bestellung"
            className="text-blue-500 underline dark:text-blue-400"
          >
            Mozartseite
          </a>
          , sowie später in der Umfrage. Die Hoodies sind Unisex geschnitten und
          in den Größen XXS bis 3XL verfügbar. Einige Farben gibt es auch in 4XL
          und 5XL, siehe Mozart-Seite.
        </p>

        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Wenn ihr Interesse an einem Hoodie habt, füllt bitte die Umfrage aus
          und gebt eure bevorzugte Versandmethode an (Privatadresse oder ins
          Office). Bei Lieferung an eine Privatadresse fallen 6,99 €
          Versandkosten an. Der Eigenanteil für die Hoodies beträgt 15,00 €,
          zahlbar per Gehaltsabzug.
        </p>
      </section>

      <p className="text-lg font-bold light:text-gray-800 dark:text-gray-100">
        Wir freuen uns, euch bald in unseren hmmh Hoodies zu sehen!
      </p>
    </main>
  );
}
