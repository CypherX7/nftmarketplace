import founder1 from "../../assets/img/founder1.webp";
import founder2 from "../../assets/img/founder2.webp";
import founder3 from "../../assets/img/founder3.webp";
const Founders = (props) => {
  const FounderList = [
    {
      FounderAvtar: founder1,
      FounderName: "Frank Cassar",
      alt: "Frank Cassar",
      FounderPost: "CEO & Co-Founder",
      FounderDisc:
        "Owned multiple successful companies. Led a retail organization - both in stores and in multi-stores for over 20 years. Has a degree in math/computer science",
      id: 1,
    },
    {
      FounderAvtar: founder2,
      FounderName: "Jarrett Pruitt",
      alt: "Jarrett Pruitt",
      FounderPost: "CMO/COO/CTO & Co- Founder ",
      FounderDisc:
        "Jarrett oversees all marketing and operations for B&E. Jarrett is known for widely popular uniques social media platforms GameChat.gg & TuneClout.com.",
      id: 2,
    },
    {
      FounderAvtar: founder3,
      FounderName: "Adam Pate",
      alt: "Adam Pate",
      FounderPost: "CFO & Co-Founder",
      FounderDisc:
        "Built three successful companies and currently works in the credit and finance industry building better credit.",
      id: 3,
    },
  ];

  return (
    <section className="founder-sec py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12">
            <div class="section-heading text-center">
              <div class="dream-dots justify-content-center">
                <span>--------</span>
              </div>
              <h2>Burn & Earn Founders</h2>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-start">
          {FounderList.map((FounderList) => (
            <div className="col-12 col-md-4 text-center" key={FounderList.id}>
              <div class="card">
                <div class="card-body text-center">
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                      <div class="pricing-item text-center">
                        <div class="wraper">
                          <img
                            src={FounderList.FounderAvtar}
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4 class="card-text">{FounderList.FounderName}</h4>
                  <div class="section-heading text-center">
                    <h6 class="dream-dots justify-content-center">
                      <span>{FounderList.FounderPost}</span>
                    </h6>
                  </div>
                  <p class="card-text">{FounderList.FounderDisc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;
