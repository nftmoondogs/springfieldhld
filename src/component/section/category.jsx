const Category = () => {
  const values = [
    { icon: "🎯", label: "Critical Thinking" },
    { icon: "🌍", label: "Global Outlook" },
    { icon: "💡", label: "Innovation" },
    { icon: "🤝", label: "Empathy" },
  ];

  return (
    <section style={{padding: '60px 0', background: '#f8fafc'}}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 order-lg-2" style={{marginBottom: '30px'}}>
            <div style={{borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px -12px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9'}}>
              <img src="assets/images/banner/01.png" alt="Our Vision" style={{width: '100%', height: 'auto', display: 'block'}} />
            </div>
          </div>
          <div className="col-lg-6 order-lg-1">
            <div style={{paddingRight: '10px'}}>
              <span style={{fontSize: '11px', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', display: 'block'}}>Our Vision</span>

              <h2 style={{fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '20px', lineHeight: 1.2}}>Shaping Tomorrow's Leaders</h2>

              <div style={{color: '#475569', lineHeight: 1.8, fontSize: '15px'}}>
                <p style={{marginBottom: '12px'}}>
                  At Spring Field Junior High School, we strive to cultivate a community of lifelong learners, prepared to excel in a constantly evolving global landscape. Our vision encompasses fostering intellectual curiosity, critical thinking, empathy, and resilience in our students.
                </p>
                <p style={{marginBottom: '12px'}}>
                  Through our dedicated faculty and staff, we deliver a comprehensive education tailored to individual strengths and interests. By embracing diversity and inclusivity, we aim to prepare our students to thrive in a multicultural world.
                </p>
              </div>

              {/* Values */}
              <div className="row g-2" style={{marginTop: '24px'}}>
                {values.map((item, i) => (
                  <div className="col-6" key={i}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
                      <span style={{fontSize: '18px'}}>{item.icon}</span>
                      <span style={{fontSize: '13px', fontWeight: 600, color: '#334155'}}>{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;