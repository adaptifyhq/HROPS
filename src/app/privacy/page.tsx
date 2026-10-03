import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-neutral-800 dark:text-neutral-200">
      <h1 className="text-3xl font-bold mb-4">Politique de confidentialité</h1>
      <p className="mb-8 text-sm text-neutral-500">Dernière mise à jour : 28 septembre 2026</p>

      <p className="mb-6">
        Chez HROps Consulting Inc. (« HROps »), nous accordons une grande importance à la
        protection de la vie privée et des renseignements personnels qui nous sont confiés.
      </p>
      <p className="mb-6">
        La présente politique explique comment HROps recueille, utilise, communique, conserve
        et protège les renseignements personnels dans le cadre de ses activités et de
        l&apos;utilisation de son site Web. HROps traite les renseignements personnels conformément
        aux lois applicables, notamment la Loi sur la protection des renseignements personnels
        dans le secteur privé du Québec.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">1. Champ d&apos;application</h2>
      <p className="mb-6">
        La présente politique s&apos;applique aux renseignements personnels recueillis par HROps,
        notamment lorsque vous consultez notre site Web, communiquez avec nous, remplissez un
        formulaire, demandez de l&apos;information sur nos services, réalisez le diagnostic de
        maturité digitale RH, vous inscrivez à nos communications ou entretenez une relation
        d&apos;affaires avec HROps.
      </p>
      <p className="mb-6">
        Un renseignement personnel est un renseignement qui concerne une personne physique et
        permet, directement ou indirectement, de l&apos;identifier. Un renseignement inféré à partir
        de vos réponses, comme un profil de maturité, constitue aussi un renseignement personnel.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">2. Renseignements que nous pouvons recueillir</h2>
      <p className="mb-4">Selon votre interaction avec HROps, nous pouvons recueillir :</p>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>votre nom et vos coordonnées professionnelles;</li>
        <li>votre organisation et votre fonction, si vous les fournissez;</li>
        <li>le contenu de vos communications et des formulaires;</li>
        <li>vos réponses au diagnostic, le score calculé et le rapport produit;</li>
        <li>votre choix concernant les communications commerciales.</li>
      </ul>
      <p className="mb-6">
        Le site n&apos;utilise pas actuellement d&apos;outil d&apos;analytique, de pixel publicitaire ni de
        témoin de marketing. Des renseignements techniques strictement nécessaires au
        fonctionnement et à la sécurité du site peuvent être traités par l&apos;hébergeur, par
        exemple pour acheminer une page ou protéger le service.
      </p>
      <p className="mb-6">
        Nous vous demandons de ne pas transmettre, au moyen de nos formulaires généraux, de
        renseignements personnels sensibles qui ne sont pas nécessaires au traitement de votre
        demande.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">3. Finalités</h2>
      <p className="mb-6">
        Nous pouvons utiliser les renseignements personnels pour répondre à vos demandes,
        communiquer avec vous, évaluer vos besoins, produire votre diagnostic et votre rapport,
        fournir nos services, gérer nos relations d&apos;affaires, administrer nos communications
        lorsque vous y avez consenti, sécuriser notre site, respecter nos obligations légales
        et exercer ou défendre nos droits. HROps limite la collecte aux renseignements
        nécessaires aux finalités déterminées.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">4. Consentement</h2>
      <p className="mb-6">
        Lorsque la loi l&apos;exige, HROps obtient un consentement adapté à la nature et à la
        sensibilité des renseignements ainsi qu&apos;aux finalités visées. Lorsque le traitement
        repose sur votre consentement, vous pouvez le retirer, sous réserve des restrictions
        légales ou contractuelles applicables. Le retrait peut limiter la capacité de HROps à
        fournir un service demandé.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">5. Infolettres et communications commerciales</h2>
      <p className="mb-6">
        HROps peut transmettre des publications, invitations, nouvelles ou offres de services
        lorsque vous y avez consenti ou lorsque la loi le permet. La case d&apos;abonnement n&apos;est
        pas précochée et elle est séparée du traitement d&apos;une demande de contact ou du
        diagnostic. Vous pouvez vous désabonner en tout temps au moyen du mécanisme prévu dans
        nos communications. Le retrait des communications commerciales n&apos;empêche pas l&apos;envoi
        de communications nécessaires à un mandat ou à une relation d&apos;affaires existante.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">6. Témoins et technologies similaires</h2>
      <p className="mb-6">
        À la date de cette politique, le site n&apos;active pas de témoins facultatifs de mesure
        d&apos;audience, de marketing ou de personnalisation. Seules des technologies strictement
        nécessaires au fonctionnement peuvent être utilisées. Vous pouvez revoir cette
        information avec l&apos;outil « Gérer mes témoins » dans le pied de page. Si un outil
        facultatif est ajouté, il ne sera pas chargé avant un choix explicite, et la présente
        politique sera mise à jour pour décrire la technologie réelle.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">7. Fournisseurs et communication à des tiers</h2>
      <p className="mb-6">
        HROps ne vend ni ne loue vos renseignements personnels. Nous pouvons les communiquer à
        des fournisseurs qui soutiennent nos activités, lorsque cette communication est
        nécessaire et permise, notamment pour l&apos;hébergement du site, l&apos;envoi des formulaires,
        la messagerie, la production du rapport de diagnostic ou des services professionnels.
        HROps peut également communiquer des renseignements lorsqu&apos;une loi, une ordonnance ou
        une autorité compétente l&apos;exige ou l&apos;autorise.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">8. Traitement ou communication à l&apos;extérieur du Québec</h2>
      <p className="mb-6">
        Certains fournisseurs technologiques peuvent traiter ou conserver des renseignements à
        l&apos;extérieur du Québec. Avant une communication de renseignements personnels à
        l&apos;extérieur du Québec lorsque la loi l&apos;exige, HROps procède à l&apos;évaluation requise et
        met en place les mesures appropriées. Les renseignements peuvent alors être assujettis
        aux lois du territoire où ils sont traités.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">9. Conservation et destruction</h2>
      <p className="mb-6">
        HROps conserve les renseignements personnels pendant la période nécessaire aux
        finalités pour lesquelles ils ont été recueillis et au respect de ses obligations
        légales, réglementaires ou contractuelles. Lorsque les renseignements ne sont plus
        nécessaires, HROps prend les mesures appropriées pour les détruire de façon sécuritaire
        ou, lorsque la loi le permet, les anonymiser.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">10. Sécurité</h2>
      <p className="mb-6">
        HROps met en œuvre des mesures administratives, techniques et organisationnelles
        raisonnables et adaptées aux renseignements détenus. Aucune méthode de transmission ou
        de conservation électronique ne garantit une sécurité absolue.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">11. Incidents de confidentialité</h2>
      <p className="mb-6">
        HROps dispose de pratiques visant à détecter, évaluer et gérer les incidents de
        confidentialité. Lorsqu&apos;un incident présente un risque de préjudice sérieux, HROps
        prend les mesures prévues par la loi, notamment les avis requis aux personnes
        concernées et à la Commission d&apos;accès à l&apos;information. HROps tient un registre des
        incidents conformément aux exigences applicables.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">12. Vos droits</h2>
      <p className="mb-6">
        Sous réserve des conditions et exceptions prévues par la loi, vous pouvez demander de
        savoir si HROps détient des renseignements personnels vous concernant, d&apos;y accéder, de
        faire rectifier des renseignements inexacts, incomplets ou équivoques, de retirer un
        consentement lorsque cela s&apos;applique et d&apos;exercer les autres droits prévus par la
        législation. Lorsque les conditions légales sont réunies, vous pouvez également
        demander la communication de certains renseignements personnels informatisés dans un
        format technologique structuré et couramment utilisé. HROps peut vérifier votre
        identité avant de traiter une demande.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">13. Diagnostic et traitement automatisé</h2>
      <p className="mb-6">
        Le diagnostic de maturité digitale RH calcule un score à partir de règles déterministes.
        Une aide logicielle peut ensuite rédiger une lecture de ce score. Elle ne modifie pas
        le résultat. Le rapport est une autoévaluation indicative. Il ne constitue pas une
        décision ayant un effet juridique sur vous. Le fonctionnement du score est décrit dans
        le rapport lui-même.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">14. Liens externes</h2>
      <p className="mb-6">
        Le site peut contenir des liens vers des services exploités par des tiers. HROps n&apos;est
        pas responsable de leurs pratiques de confidentialité.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">15. Gouvernance et plaintes</h2>
      <p className="mb-6">
        Toute question ou plainte relative à la protection des renseignements personnels peut
        être adressée au responsable indiqué ci-dessous.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">16. Responsable de la protection des renseignements personnels</h2>
      <p className="mb-6">
        Responsable : Président / Responsable de la protection des renseignements personnels
        <br />
        HROps Consulting Inc.
        <br />
        Québec, Canada
        <br />
        Courriel :{" "}
        <a className="underline" href="mailto:confidentialite@hrops-consulting.com">
          confidentialite@hrops-consulting.com
        </a>
      </p>
      <p className="mb-6">
        Les demandes d&apos;accès, de rectification, de retrait du consentement, questions et
        plaintes relatives à la protection des renseignements personnels peuvent être
        transmises à cette adresse.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">17. Modifications</h2>
      <p className="mb-6">
        HROps peut modifier la présente politique afin de tenir compte de l&apos;évolution de ses
        pratiques, technologies ou obligations. La version la plus récente est publiée sur le
        site et indique la date de mise à jour.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">18. Nous joindre</h2>
      <p className="mb-6">
        HROps Consulting Inc.
        <br />
        Québec, Canada
        <br />
        <Link href="/contact" className="underline">
          Formulaire de contact
        </Link>
      </p>
    </div>
  );
}
