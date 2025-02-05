import { useEffect, useState } from "react";
import "./App.scss";
import * as contentful from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

function App() {
  const [data, setData] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const client = contentful.createClient({
    space: import.meta.env.VITE_PUBLIC_SPACE_ID,
    accessToken: import.meta.env.VITE_PUBLIC_ACCESTOKEN,
  });

  useEffect(() => {
    client
      .getEntries()
      .then((res) => setData(res))
      .catch((err) => console.error("Error fetching data:", err));

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true); // Når du scroller mere end 100px ned
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {data?.items?.map((item) => (
        <div key={item.sys.id}>
          <header id="globalHeader">
            <img id="HeaderImage" src={item.fields.headerImage.fields.file.url} />
            <div id="absiluteText">
              <div id="flex">
                <img src="/images/Kunst.png" alt="Kunst Logo" />
                <h1>{item.fields.title}</h1>
              </div>
              <h2>{item.fields.headerText}</h2>
            </div>
          </header>

          <main id="globalMain">
            {/* om os */}
            <header id="MainHeader">
              <h2>Om os</h2>
              <img src="/images/Kunst.png" alt="Kunst Logo" />
            </header>
            <main id="descriptionContainer">
              <div id="borderRadiusContainer">
                <div>
                  <p id="descriptionText">{item.fields.description}</p>
                  <p id="descriptionText">{item.fields.descriptionTwo}</p>
                  <p id="descriptionText">{item.fields.descriptionThree}</p>
                </div>
                <div id="mainImageContainer">
                  <img id="mainImage" src={item.fields.mainImage.fields.file.url} />
                </div>
              </div>
            </main>
            {/* Galleri */}
          </main>

          {item.fields.text && documentToReactComponents(item.fields.text)}
        </div>
      ))}
    </>
  );
}

export default App;
