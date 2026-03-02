import Container from './Container';

export default function Footer() {
  return (
    <footer className="bg-[#1f2435] pb-7 pt-12 text-white sm:pt-16">
      <Container>
        <div className="grid gap-10 border-b border-white/10 pb-11 md:grid-cols-4 lg:grid-cols-[1.6fr,0.8fr,0.8fr,1.2fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#4640de] text-xs font-bold text-white">
                Q
              </span>
              <span className="text-[22px] font-extrabold sm:text-[30px]">QuickHire</span>
            </div>
            <p className="mt-5 max-w-[280px] text-[14px] leading-7 text-[#b6bdd2]">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          <div>
            <h3 className="text-[18px] font-semibold">About</h3>
            <ul className="mt-4 space-y-3 text-[14px] text-[#b6bdd2]">
              <li>Companies</li>
              <li>Pricing</li>
              <li>Terms</li>
              <li>Advice</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="text-[18px] font-semibold">Resources</h3>
            <ul className="mt-4 space-y-3 text-[14px] text-[#b6bdd2]">
              <li>Help Docs</li>
              <li>Guide</li>
              <li>Updates</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div>
            <h3 className="text-[18px] font-semibold">Get job notifications</h3>
            <p className="mt-4 text-[14px] text-[#b6bdd2]">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-0">
              <input
                className="h-11 w-full rounded-none border-0 bg-white px-4 text-sm text-slate-700 outline-none"
                placeholder="Email Address"
              />
              <button className="h-11 rounded-none bg-[#4640de] px-5 text-sm font-semibold text-white">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 text-[13px] text-[#97a0bb] sm:flex-row sm:items-center sm:justify-between">
          <p>2021 @ QuickHire. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {['f', 'x', 'i', 'in', 't'].map((item) => (
              <span
                key={item}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-[11px]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
