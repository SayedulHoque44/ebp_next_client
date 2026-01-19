import React from "react";
import Container from "../../../Shared/Container/Container";

const PDFBook = () => {
  const PDFArray = [
    {
      id: 1,
      title: "পাতেন্তের বাংলা বই Part-1.pdf",
      link: "https://drive.google.com/file/d/12BJCn_IHXywTpMaiUjKBeo2EDZGtF6ln/view?usp=sharing",
    },
    {
      id: 2,
      title: "পাতেন্তের বাংলা বই Part-2.pdf",
      link: "https://drive.google.com/file/d/1FGr_44FkY6IGjbXIz_yMRPMaIQ9ww8ft/view?usp=sharing",
    },
    {
      id: 3,
      title: "পাতেন্তের বাংলা বই Part-3.pdf",
      link: "https://drive.google.com/file/d/1MUo0lAf7M-8CAbobkVi8QoRInE17MRbg/view?usp=sharing",
    },
    {
      id: 4,
      title: "পাতেন্তের বাংলা বই Part-4.pdf",
      link: "https://drive.google.com/file/d/1vf47W786m7DYfA7bSmiYeM8wyqLZ3ayr/view?usp=sharing",
    },
  ];
  return (
    <div className="py-10">
      <Container>
        <h1 className="text-4xl my-5 text-center">পাতেন্তের বাংলা বই PDF</h1>
        <div className="py-5">
          {PDFArray.map(({ id, title, link }) => (
            <a
              className="block p-3 bg-P-Black text-P-gry my-5 rounded"
              key={id}
              href={link}
            >
              {title}
            </a>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PDFBook;
