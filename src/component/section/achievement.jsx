import { Link } from "react-router-dom";

const achieveList = [
  {
    icon: "💰",
    title: "Transparent Fee Structure",
    desc: "Explore our affordable and transparent fee structure, designed to ensure quality education is accessible to all.",
    btnText: "View Fees →",
    link: "/blog",
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    icon: "📚",
    title: "Curated Book Lists",
    desc: "Discover the carefully selected list of books for each class, crafted to provide a comprehensive learning experience.",
    btnText: "Browse Books →",
    link: "/about",
    color: "#3b82f6",
    bg: "#eff6ff",
  },
];

const Achievement = () => {
  return (
    <section style={{padding: '60px 0', background: '#fff'}}>
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <span style={{fontSize: '11px', fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', display: 'block'}}>Quick Access</span>
          <h2 style={{fontSize: '32px', fontWeight: 800, color: '#0f172a'}}>Everything You Need</h2>
          <p style={{color: '#64748b', marginTop: '8px', fontSize: '15px'}}>Access fee details and book lists for all classes in one place.</p>
        </div>

        <div className="row g-4 justify-content-center">
          {achieveList.map((item, i) => (
            <div className="col-md-6 col-lg-5" key={i}>
              <Link to={item.link} style={{display: 'block', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', textDecoration: 'none', transition: 'all 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
                <div style={{height: '5px', background: item.color}}></div>
                <div style={{padding: '28px'}}>
                  <div style={{width: '52px', height: '52px', background: item.bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '18px', border: `1px solid ${item.color}22`}}>
                    {item.icon}
                  </div>
                  <h3 style={{fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '10px'}}>{item.title}</h3>
                  <p style={{color: '#64748b', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px'}}>{item.desc}</p>
                  <span style={{fontSize: '14px', fontWeight: 700, color: item.color}}>{item.btnText}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievement;