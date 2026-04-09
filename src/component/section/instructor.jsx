const contactList = [
  { icon: "📍", title: "Address", desc: "Behind Ara Machine, Kidwai Nagar, Haldwani (Nainital) Uttrakhand" },
  { icon: "📞", title: "Phone", desc: "+91 8881177767" },
  { icon: "✉️", title: "Email", desc: "springfieldhld@gmail.com" },
  { icon: "🌐", title: "Website", desc: "www.springfieldhld.com" },
];

const Instructor = () => {
  return (
    <section style={{padding: '60px 0', background: '#f8fafc'}}>
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: '36px'}}>
          <span style={{fontSize: '11px', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', display: 'block'}}>Get In Touch</span>
          <h2 style={{fontSize: '32px', fontWeight: 800, color: '#0f172a'}}>Contact Us</h2>
          <p style={{color: '#64748b', marginTop: '8px', fontSize: '15px'}}>Reach out through any of the channels below.</p>
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <div style={{borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px -12px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9', height: '100%', minHeight: '280px'}}>
              <img src="assets/images/choose/01.png" alt="School Location" style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
            </div>
          </div>
          <div className="col-lg-5">
            {contactList.map((item, i) => (
              <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px 18px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: i < contactList.length - 1 ? '10px' : '0', transition: 'all 0.2s'}}>
                <div style={{width: '42px', height: '42px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0}}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '3px'}}>{item.title}</h4>
                  <p style={{fontSize: '14px', fontWeight: 500, color: '#1e293b', lineHeight: 1.5, margin: 0}}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instructor;