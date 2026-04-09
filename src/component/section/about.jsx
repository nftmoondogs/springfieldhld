const About = () => {
  return (
    <section className="about-section" style={{padding: '60px 0', background: '#fff'}}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6" style={{marginBottom: '30px'}}>
            <div style={{borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px -12px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9'}}>
              <img src="assets/images/about/01.png" alt="Principal" style={{width: '100%', height: 'auto', display: 'block'}} />
            </div>
          </div>
          <div className="col-lg-6">
            <div style={{paddingLeft: '10px'}}>
              <span style={{fontSize: '11px', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', display: 'block'}}>From the Principal's Desk</span>

              <h2 style={{fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '20px', lineHeight: 1.2}}>Principal's Message</h2>

              <div style={{color: '#475569', lineHeight: 1.8, fontSize: '15px'}}>
                <p style={{marginBottom: '12px'}}>
                  Welcome to Spring Field Junior High School, an institution committed to academic excellence and student empowerment. Our dedicated faculty and staff strive to provide a comprehensive education tailored to individual needs, fostering both intellectual growth and personal development.
                </p>
                <p style={{marginBottom: '12px'}}>
                  We pride ourselves on nurturing a diverse and vibrant learning community, equipped with great facilities and a dynamic curriculum. I encourage you to explore our website and learn about the enriching opportunities Spring Field Junior High School offers.
                </p>
              </div>

              <div style={{marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #f1f5f9'}}>
                <p style={{color: '#94a3b8', fontSize: '14px', fontStyle: 'italic', marginBottom: '4px'}}>Sincerely,</p>
                <p style={{fontWeight: 700, color: '#1e293b', fontSize: '16px', marginBottom: '2px'}}>Nighat Parveen</p>
                <p style={{color: '#d97706', fontSize: '13px', fontWeight: 600}}>Principal, Spring Field Junior High School</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;