import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import FaqAccordion from "../components/ui/FAQ";

export default function Beranda() {
  const faqs = [
    {
      question: "Apa itu INVOFEST?",
      answer:
        "Invofest (Informatics Vocational Festival) adalah festival tahunan yang diakan oleh program studi sarjana terapan teknik informatika Universitas Harkat Negeri, yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia dalam menghadapi era digital.",
    },
    {
      question: "Kapan dan dimana INVOFEST dilaksanakan?",
      answer:
        "INVOFEST diselenggarakan mulai tanggal 21 Oktober 2025 sampai dengan tanggal 27 November 2025.",
    },
    {
      question: "Apakah ada biaya pendaftaran di INVOFEST?",
      answer: "Semua kegiatan dipastikan berbayar ya teman-teman.",
    },
    {
      question: "Bagaimana saya mengetahui pemenang kompetisi?",
      answer:
        "Pemenang akan diinformasikan melalui media sosial instagram dari invofest @invofest_harkatnegeri.",
    },
    {
      question: "Apa yang didapat pemenang dalam kompetisi?",
      answer:
        "Pemenang kompetisi akan mendapatkan hadiah trophy, uang pembinaan, dan e-sertifikat.",
    },
    {
      question: "Bagaimana cara mendaftar event?",
      answer:
        "Buka website invofest lalu pergi ke halaman event yang anda ingin ikuti dan klik tombol Registrasi.",
    },
  ];

  const eventSections = [
    {
      id: "seminar",
      title: "IT Seminar",
      description:
        "Seminar nasional yang membahas strategi dan arsitektur teknologi untuk menciptakan sistem di mana manusia dan AI bekerja sebagai mitra yang sinergis. Yang bertujuan mengubah paradigma dari persaingan menjadi kolaborasi, serta meningkatkan pengetahuan peserta dalam merancang teknologi AI yang berpusat pada manusia.",
      image: "https://www.invofest-harkatnegeri.com/assets/Maskot-Seminar.png",
      imageOnLeft: false,
      buttons: [{ label: "Daftar Sekarang", variant: "primary" as const }],
    },
    {
      id: "talkshow",
      title: "IT Talkshow",
      description:
        "Talkshow “Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan”, sebuah diskusi interaktif yang mengeksplorasi cara mengintegrasikan nilai-nilai kemanusiaan seperti etika, empati, dan kreativitas ke dalam pengembangan kecerdasan buatan. Sesi ini bertujuan menginspirasi audiens untuk membangun dan memanfaatkan AI sebagai alat kolaboratif yang memperkuat potensi unik manusia, bukan sebagai penggantinya.",
      image: "https://www.invofest-harkatnegeri.com/assets/Maskot-Talkshow.png",
      imageOnLeft: true,
      buttons: [{ label: "Daftar Sekarang", variant: "primary" as const }],
    },
    {
      id: "workshop",
      title: "IT Workshop",
      description:
        'Workshop "AI for a Sustainable Future: The Role of Z Generation in the Digital Era" ini menjembatani antara potensi Generasi Z dan kekuatan AI untuk menciptakan masa depan yang berkelanjutan. Peserta akan dibekali wawasan dan alat untuk mentransformasi ide-ide inovatif menjadi solusi lingkungan yang nyata dan terukur di era digital.',
      image: "https://www.invofest-harkatnegeri.com/assets/Maskot-Workshop.png",
      imageOnLeft: false,
      buttons: [{ label: "Daftar Sekarang", variant: "primary" as const }],
    },
    {
      id: "competition",
      title: "IT Competition",
      description:
        "Kompetisi dalam INVOFEST ini mengusung tema “From Creation to Innovation”. Tema ini bertujuan mengajak generasi muda untuk mengembangkan inovasi dan kreativitas guna membentuk kelompok yang memiliki potensi luar biasa, yang mampu mewujudkan masa depan yang berkelanjutan.",
      image: "https://www.invofest-harkatnegeri.com/assets/Maskot-Lomba.png",
      imageOnLeft: true,
      buttons: [
        { label: "Info Selengkapnya", variant: "primary" as const },
        { label: "Hubungi Panitia", variant: "outline" as const },
      ],
    },
  ];

  return (
    <div className="space-y-20 md:space-y-24 pb-16">
      <section
        id="hero"
        className="py-6 md:py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
      >
        <div className="flex flex-col gap-6">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/text-image.png"
            alt="INVOFEST"
            className="w-full max-w-[420px]"
          />
          <p className="text-base md:text-lg lg:text-[1.35rem] text-slate-600 leading-relaxed">
            Invofest (Informatics Vocational Festival) adalah festival tahunan
            yang bertujuan untuk menginspirasi dan memberdayakan generasi muda
            Indonesia dalam menghadapi era digital. Dengan mengusung tema{" "}
            <strong className="font-bold">
              “Beyond Limits, Beyond Intelligence: Innovate for a Smarter
              Tomorrow”
            </strong>
            .
          </p>

          <div className="flex flex-wrap gap-3">
            <Button label="INFO SELENGKAPNYA" variant="primary" />
            <Button label="HUBUNGI PANITIA" variant="outline" />
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/Maskot-Hero.png"
            alt="Maskot Invofest"
            className="w-full max-w-sm lg:max-w-md"
          />
        </div>
      </section>

      <section className="w-full relative z-10">
        <div className="mb-12 max-w-5xl">
          <h2 className="text-4xl md:text-[46px] font-medium text-[#8b2551] mb-6 tracking-tight">
            Tentang <span className="font-bold">INVOFEST</span>
          </h2>
          <p className="text-slate-600/90 text-lg md:text-2xl leading-relaxed">
            Invofest 2025, yang diselenggarakan oleh sarjana terapan Teknik
            Informatika Universitas Harkat Negeri, adalah festival tahunan yang
            bertujuan untuk menginspirasi dan memberdayakan generasi muda
            Indonesia dalam menghadapi era digital. Dengan mengusung tema{" "}
            <strong className="text-slate-800 font-bold">
              "Beyond Limits, Beyond Intelligence: Innovate for a Smarter
              Tomorrow"
            </strong>
            . Invofest 2025 menghadirkan berbagai kegiatan menarik seperti
            kompetisi IT, workshop IT, dan seminar nasional & talkshow dengan
            para ahli teknologi.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <Card
            title="IT Seminar"
            description='Seminar nasional ini membahas "Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif" untuk mengembangkan potensi diri dan pengetahuan teknologi lebih dalam lagi.'
          >
            <Button label="INFO SELENGKAPNYA" variant="primary" />
          </Card>

          <Card
            title="IT Talkshow"
            description='Talkshow "Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan" membahas peran manusia dalam memanfaatkan AI untuk solusi berkelanjutan dan peningkatan teknologi.'
          >
            <Button className="w-full text-xs" label="INFO SELENGKAPNYA" variant="primary" />
          </Card>

          <Card
            title="IT Competition"
            description='Kompetisi "From Creation to Innovation" mengajak generasi muda untuk mengembangkan inovasi dan kreativitas guna membentuk kelompok yang memiliki potensi luar biasa, yang mampu mewujudkan masa depan.'
          >
            <Button className="w-full text-xs" label="INFO SELENGKAPNYA" variant="primary" />
          </Card>

          <Card
            title="IT Workshop"
            description="Workshop 'AI for a Sustainable Future: The Role of Z Generation in the Digital Era' membekali Gen Z dengan keterampilan praktis AI untuk menciptakan solusi berkelanjutan."
          >
            <Button className="w-full text-xs" label="INFO SELENGKAPNYA" variant="primary" />
          </Card>
        </div>
      </section>

      <section className="space-y-16 md:space-y-24 pt-4">
        {eventSections.map((section) => {
          const imageElement = (
            <div className="flex justify-center">
              <img
                src={section.image}
                alt={section.title}
                className="w-full max-w-[280px] md:max-w-sm"
              />
            </div>
          );

          const contentElement = (
            <div className="flex flex-col gap-6">
              <h1 className="text-red-800 text-4xl md:text-5xl font-semibold">
                {section.title}
              </h1>
              <p className="text-base md:text-lg lg:text-[1.35rem] text-slate-600 leading-relaxed">
                {section.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {section.buttons.map((button) => (
                  <Button
                    key={`${section.id}-${button.label}`}
                    label={button.label}
                    variant={button.variant}
                  />
                ))}
              </div>
            </div>
          );

          return (
            <div
              key={section.id}
              id={section.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              {section.imageOnLeft ? (
                <>
                  {imageElement}
                  {contentElement}
                </>
              ) : (
                <>
                  {contentElement}
                  {imageElement}
                </>
              )}
            </div>
          );
        })}
      </section>

      <section id="faq" className="pt-2">
        <div className="text-center">
          <div className="mt-4 mb-4">
            <span className="text-slate-600 text-lg  font-semibold   ">
              FAQ
            </span>
          </div>

          <h2 className="text-slate-600 text-4xl font-bold">
            Punya Pertanyaan? Lihat{" "}
          </h2>
          <h2 className=" text-4xl  text-red-800 font-bold mb-4">Disini</h2>
          <div className="text-base text-slate-600 mt-5">
            <p>
              Ada banyak informasi yang terkait dengan INVOFEST, Anda dapat
              melihat
            </p>
            <p>daftar pertanyaan di bawah ini.</p>
          </div>
        </div>
      </section>
      <section>
        <FaqAccordion faqs={faqs} />
      </section>
    </div>
  );
}
