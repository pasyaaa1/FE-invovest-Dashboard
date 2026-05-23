import EventCard from "../components/ui/CardCompetition";
import Button from "../components/ui/Button";
import FaqAccordion from "../components/ui/FAQ";

const event = [
  {
    image:
      "https://www.invofest-harkatnegeri.com/assets/competition-card/software_dev.png",
    title: "Poster Design Competition",
    description: `Poster Design Competition ini adalah kompetisi untuk menciptakan suatu karya dalam bentuk poster digital yang 
    komunikatif dan inspiratif, guna menyuarakan gagasan atau
     solusi visual terhadap permasalahan yang ada sekarang ini`,
  },
  {
    image:
      "https://www.invofest-harkatnegeri.com/assets/competition-card/ui_ux.png",
    title: "UI/UX Design Competition",
    description: `UI/UX Design Competition ini adalah kompetisi untuk menciptakan dan merancang inovasi sebuah produk digital yang
     dapat berupa website maupun mobile apps serta dapat membuat nyaman calon pengguna.`,
  },
  {
    image:
      "https://www.invofest-harkatnegeri.com/assets/competition-card/web_design.png",
    title: "Web Design Competition",
    description: `Web Design Competition ini adalah kompetisi untuk menciptakan suatu perangkat
     lunak berbasis website yang menggunakan 
    desain menarik, unik, dan responsive pada semua device serta sesuai dengan tema kompetisi.`,
  },
];
const faqs = [
    {
        question: "Apa itu INVOFEST?",
        answer: "Invofest (Informatics Vocational Festival) adalah festival tahunan yang diakan oleh program studi sarjana terapan teknik informatika Universitas Harkat Negeri, yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia dalam menghadapi era digital.",
    },
    {
        question: "Kapan dan dimana INVOFEST dilaksanakan?",
        answer: "INVOFEST diselenggarakan mulai tanggal 21 Oktober 2025 sampai dengan tanggal 27 November 2025.",
    },
    {
        question: "Apakah ada biaya pendaftaran di INVOFEST?",
        answer: "Semua kegiatan dipastikan berbayar ya teman-teman.",
    },
    {
        question: "Bagaimana saya mengetahui pemenang kompetisi?",
        answer: "Pemenang akan diinformasikan melalui media sosial instagram dari invofest @invofest_harkatnegeri.",
    },
    {
        question: "Apa yang didapat pemenang dalam kompetisi?",
        answer: "Pemenang kompetisi akan mendapatkan hadiah trophy, uang pembinaan, dan e-sertifikat.",
    },
    {
        question: "Bagaimana cara mendaftar event?",
        answer: "Buka website invofest lalu pergi ke halaman event yang anda ingin ikuti dan klik tombol Registrasi.",
    },
];

export default function Competition() {
  return (
    <div>
      <section
        id="hero"
        className="py-6 md:py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center"
      >
        <div className="flex flex-col gap-4 md:gap-6 order-2 lg:order-1">
          <h1 className="text-red-800 text-3xl sm:text-4xl md:text-5xl font-semibold">
            IT Competition
          </h1>
          <h2 className="text-red-800 text-xl sm:text-2xl md:text-3xl font-semibold">
            "From Creation to Innovation"
          </h2>

          <p className="text-sm md:text-base lg:text-[1.35rem] text-slate-600 leading-relaxed">
            Kompetisi dalam INVOFEST ini mengusung tema “From Creation to
            Innovation”, Tema ini bertujuan mengajak generasi muda untuk
            mengembangkan inovasi dan kreativitas guna membentuk kelompok yang
            memiliki potensi luar biasa, yang mampu mewujudkan masa depan yang
            berkelanjutan.
          </p>

          <div className="flex gap-3">
            <Button label="Info Selengkapnya" variant="primary" />
            <Button label="Hubungi Panitia" variant="outline" />
          </div>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/Maskot-Lomba.png"
            alt="Maskot IT Competition"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md"
          />
        </div>
      </section>
      <section>
        <div className=" ">
          <div className="text-center px-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-red-800 mt-8 md:mt-16 font-semibold">
              DESKRIPSI KOMPETISI
            </h1>
            <p className="mt-5 text-base md:text-lg lg:text-[1.35rem] leading-relaxed">
              Kompetisi atau perlombaan yang ada dalam kegiatan{" "}
              <b>INVOFEST (Infomatics Vocational Festival) 2025</b> adalah
              diantaranya National Poster Design Competition, UI UX Design
              Competition, dan juga UI/UX Design Competition. Kompetisi dalam
              INVOFEST ini mengusung tema <b>“From Creation to Innovation”</b>
              Tema ini bertujuan mengajak generasi muda untuk mengembangkan
              inovasi dan kreativitas guna membentuk kelompok yang memiliki
              potensi luar biasa, yang mampu mewujudkan masa depan yang
              berkelanjutan. Melalui pendekatan ini, diharapkan generasi ini
              akan berperan dalam menciptakan solusi-solusi baru untuk tantangan
              masa kini dan mendatang, baik dalam hal teknologi, lingkungan,
              pendidikan, maupun tanggung jawab sosial.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-12 md:mt-24">
          <div>
            <div className="text-center px-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl text-red-800 font-semibold">
                DAFTAR KOMPETISI
              </h1>
              <p className="mt-5 text-base md:text-lg text-slate-600 mb-7 leading-8">
                Berikut Adalah Daftar Kompetisi Yang Ada Pada Event INVOFEST.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6">
              {event.map((event, index) => (
                <EventCard
                  key={index}
                  image={event.image}
                  title={event.title}
                  description={event.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="text-center">
          <div className="mt-4 mb-4">
            <span className="text-slate-600 text-lg  font-semibold   ">
              FAQ
            </span>
          </div>

          <h2 className="text-slate-600 text-2xl sm:text-3xl md:text-4xl font-bold px-2">
            Punya Pertanyaan? Lihat{" "}
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-red-800 font-bold mb-4">Disini</h2>
          <div className="text-base text-slate-600 mt-5" >
            <p >
              Ada banyak informasi yang terkait dengan INVOFEST, Anda dapat melihat
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
