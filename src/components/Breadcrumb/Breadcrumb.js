

const Breadcrumb = (props) => {
  return (
    <div className="breadcumb-area clearfix">
          <div className="breadcumb-content">
              <div className="container h-100">
                  <div className="row h-100 align-items-center">
                      <div className="col-12">
                          <nav aria-label="breadcrumb" className="breadcumb--con text-center pt-5 mt-5">
                              <h2 className="title pt-5">{props.namePage}</h2>
                              <ol className="breadcrumb justify-content-center">
                                  <li className="breadcrumb-item"><a>Home</a></li>
                                  <li className="breadcrumb-item" aria-current="page">{props.title}</li>
                                  {/* {addOther && <li className="breadcrumb-item active" aria-current="page">{addOther}</li>} */}
                              </ol>
                          </nav>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};
export default Breadcrumb;
