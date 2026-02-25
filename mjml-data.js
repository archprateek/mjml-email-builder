// ================================================================
// MJML Master Template Data
// ================================================================

const MJML_HEAD = `
  <mj-head>
    <mj-title>Email Template</mj-title>
    <mj-preview>Preview text</mj-preview>
    <mj-breakpoint width="480px" />
    <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
    <mj-attributes>
      <mj-all
        font-family="Roboto,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif"
        font-weight="400"
      />
      <mj-text font-size="15px" line-height="24px" color="%%TEXT%%" padding="0" font-weight="400" />
      <mj-section padding="0" />
      <mj-image padding="0" border-radius="6px" />
      <mj-divider border-width="1px" border-color="%%BORDER%%" padding="8px 0" />
      <mj-class name="t-display" font-size="26px" line-height="32px" font-weight="700" color="%%TEXT%%" />
      <mj-class name="t-h1" font-size="20px" line-height="26px" font-weight="700" color="%%TEXT%%" />
      <mj-class name="t-h2" font-size="17px" line-height="22px" font-weight="600" color="%%TEXT%%" />
      <mj-class name="t-muted" font-size="14px" line-height="22px" font-weight="400" color="%%MUTED%%" />
      <mj-class name="t-label" font-size="11px" line-height="16px" font-weight="700" color="%%MUTED%%" letter-spacing="0.5px" />
      <mj-class name="t-mono"
        font-family="ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace"
        font-size="13px" line-height="20px" font-weight="400" color="%%TEXT%%"
      />
      <mj-button
        background-color="%%CTA%%" color="%%CTA_TEXT%%" font-size="14px"
        font-weight="600" border-radius="8px" inner-padding="12px 24px"
        align="left" padding="0"
      />
      <mj-class name="btn-primary" background-color="%%CTA%%" color="%%CTA_TEXT%%" border-radius="8px" font-weight="600" inner-padding="12px 24px" />
      <mj-class name="btn-secondary" background-color="%%SURFACE%%" color="%%BRAND%%" border="1px solid %%BORDER%%" border-radius="8px" font-weight="600" inner-padding="12px 24px" />
      <mj-class name="btn-link" background-color="transparent" color="%%LINK%%" border="0px solid transparent" border-radius="0px" font-weight="600" inner-padding="0" font-size="14px" />
      <mj-class name="btn-ghost" background-color="rgba(255,255,255,0.15)" color="#ffffff" border="1px solid rgba(255,255,255,0.3)" border-radius="8px" font-weight="600" inner-padding="12px 24px" />
      <mj-class name="chip" background-color="%%TINT_BLUE%%" color="%%BRAND%%" border="1px solid #bcd3ff" border-radius="999px" font-size="13px" font-weight="600" inner-padding="6px 16px" />
    </mj-attributes>
    <mj-style>
      a { color: %%LINK%%; text-decoration: none; }
      a:hover { text-decoration: underline; }
      .rounded-img img { border-radius: 8px !important; }
      .card-border { border: 1px solid %%BORDER%%; border-radius: 10px; }
    </mj-style>
    <mj-style inline="inline">
      @media only screen and (max-width: 480px) {
        td[class*="t-display"] { font-size: 22px !important; line-height: 28px !important; }
        td[class*="t-h1"] { font-size: 18px !important; line-height: 24px !important; }
        div.card-gap { margin-bottom: 16px !important; }
      }
    </mj-style>
  </mj-head>`;

const COMPONENTS = [
  {
    id: "utility-bar",
    name: "Utility Bar",
    icon: "🔗",
    category: "Header",
    desc: "View online link at top",
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="10px 24px">
      <mj-column>
        <mj-button mj-class="btn-link" href="{{view_in_browser_url}}" align="right">View online →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "alert-info",
    name: "Alert Bar (Info)",
    icon: "ℹ️",
    category: "Header",
    desc: "Blue info alert banner",
    mjml: `    <mj-section background-color="%%TINT_BLUE%%" padding="12px 24px">
      <mj-column>
        <mj-text align="center" font-weight="600" font-size="14px">New updates you can skim quickly.</mj-text>
      </mj-column>
    </mj-section>`
  },
  {
    id: "alert-warning",
    name: "Alert Bar (Warning)",
    icon: "⚠️",
    category: "Header",
    desc: "Orange warning alert banner",
    mjml: `    <mj-section background-color="%%TINT_ORANGE%%" padding="12px 24px">
      <mj-column>
        <mj-text align="center" font-weight="600" font-size="14px" color="#7c2d12">Notice: A few events changed dates recently.</mj-text>
      </mj-column>
    </mj-section>`
  },
  {
    id: "alert-error",
    name: "Alert Bar (Error)",
    icon: "🚨",
    category: "Header",
    desc: "Red error alert banner",
    mjml: `    <mj-section background-color="%%TINT_RED%%" padding="12px 24px">
      <mj-column>
        <mj-text align="center" font-weight="600" font-size="14px" color="#7f1d1d">Alert: Action needed on your account.</mj-text>
      </mj-column>
    </mj-section>`
  },
  {
    id: "brand-header",
    name: "Brand Header",
    icon: "🟧",
    category: "Header",
    desc: "Logo + greeting + user context",
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="20px 24px 12px">
      <mj-column width="60%">
        <mj-text mj-class="t-h2">🟧 10times</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">Hi {{first_name}}, here's what's worth a look.</mj-text>
      </mj-column>
      <mj-column width="40%">
        <mj-text mj-class="t-label" align="right">{{city}} • {{industry}}</mj-text>
        <mj-spacer height="6px" />
        <mj-button mj-class="btn-link" href="{{preferences_url}}" align="right">Update preferences →</mj-button>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="0 24px 4px">
      <mj-column><mj-divider /></mj-column>
    </mj-section>`
  },
  {
    id: "brand-header-simple",
    name: "Brand Header (Simple)",
    icon: "🟧",
    category: "Header",
    desc: "Clean logo + greeting only, no right side",
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="20px 24px 12px">
      <mj-column>
        <mj-text mj-class="t-h2">🟧 10times</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">Hi {{first_name}}, here's what's worth a look.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="0 24px 4px">
      <mj-column><mj-divider /></mj-column>
    </mj-section>`
  },
  {
    id: "brand-header-logo",
    name: "Brand Header (Logo Image)",
    icon: "🖼️",
    category: "Header",
    desc: "Logo image + greeting, clean look",
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="24px 24px 12px">
      <mj-column>
        <mj-image src="https://img.10times.com/img/mail-10times-logo-192x40.png" alt="10times" width="120px" align="left" padding="0" />
        <mj-spacer height="12px" />
        <mj-text mj-class="t-muted">Hi {{first_name}}, here's what's worth a look.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="0 24px 4px">
      <mj-column><mj-divider /></mj-column>
    </mj-section>`
  },
  {
    id: "brand-header-logo-nav",
    name: "Brand Header (Logo + Nav)",
    icon: "🧭",
    category: "Header",
    desc: "Logo image with right-aligned nav links",
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="18px 24px 12px">
      <mj-column width="40%">
        <mj-image src="https://img.10times.com/img/mail-10times-logo-192x40.png" alt="10times" width="120px" align="left" padding="0" />
      </mj-column>
      <mj-column width="60%">
        <mj-text align="right" padding="4px 0 0 0">
          <a href="{{events_url}}" style="color:%%LINK%%;text-decoration:none;font-size:13px;font-weight:600;">Events</a>&nbsp;&nbsp;&nbsp;
          <a href="{{profile_url}}" style="color:%%LINK%%;text-decoration:none;font-size:13px;font-weight:600;">Profile</a>&nbsp;&nbsp;&nbsp;
          <a href="{{preferences_url}}" style="color:%%LINK%%;text-decoration:none;font-size:13px;font-weight:600;">Settings</a>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="0 24px 0">
      <mj-column>
        <mj-text mj-class="t-muted">Hi {{first_name}}, here's what's worth a look.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="0 24px 4px">
      <mj-column><mj-divider /></mj-column>
    </mj-section>`
  },
  {
    id: "brand-header-centered",
    name: "Brand Header (Centered)",
    icon: "🎯",
    category: "Header",
    desc: "Centered logo + greeting + tagline",
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="28px 24px 8px">
      <mj-column>
        <mj-image src="https://img.10times.com/img/mail-10times-logo-192x40.png" alt="10times" width="130px" align="center" padding="0" />
        <mj-spacer height="14px" />
        <mj-text mj-class="t-h2" align="center">Hi {{first_name}} 👋</mj-text>
        <mj-spacer height="4px" />
        <mj-text mj-class="t-muted" align="center">Here's what's happening in {{city}} this week.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="0 24px 4px">
      <mj-column><mj-divider /></mj-column>
    </mj-section>`
  },
  {
    id: "chips",
    name: "Chips / Badge Buttons",
    icon: "🏷️",
    category: "Header",
    desc: "Trending, Free entry, Online badges",
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="8px 24px 16px">
      <mj-column width="33.33%" padding="4px 4px">
        <mj-button mj-class="chip" href="{{chip_1_url}}" align="center">Trending</mj-button>
      </mj-column>
      <mj-column width="33.33%" padding="4px 4px">
        <mj-button mj-class="chip" href="{{chip_2_url}}" align="center">Free entry</mj-button>
      </mj-column>
      <mj-column width="33.33%" padding="4px 4px">
        <mj-button mj-class="chip" href="{{chip_3_url}}" align="center">Online</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "hero-dark",
    name: "Hero (Dark Brand)",
    icon: "🌑",
    category: "Hero",
    desc: "Dark background hero with CTA",
    mjml: `    <mj-section background-color="%%BRAND%%" padding="28px 24px">
      <mj-column>
        <mj-text mj-class="t-display" color="#ffffff">A short list you can scan in a minute.</mj-text>
        <mj-spacer height="10px" />
        <mj-text color="#dbeafe">
          Local highlights first, then strong picks around {{country}} and globally — based on what you follow.
        </mj-text>
        <mj-spacer height="16px" />
        <mj-button mj-class="btn-primary" href="{{primary_cta_url}}">View local picks →</mj-button>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-ghost" href="{{secondary_cta_url}}">Open watchlist →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "hero-light",
    name: "Hero (Light)",
    icon: "☀️",
    category: "Hero",
    desc: "Subtle light hero with CTA",
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="24px 24px">
      <mj-column>
        <mj-text mj-class="t-display">A quick scan of what's happening.</mj-text>
        <mj-spacer height="8px" />
        <mj-text mj-class="t-muted">Skim, open what's relevant, and ignore the rest.</mj-text>
        <mj-spacer height="12px" />
        <mj-button mj-class="btn-primary" href="{{hero_light_cta_url}}">Open highlights →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "hero-image",
    name: "Hero (Image)",
    icon: "🖼️",
    category: "Hero",
    desc: "Image hero with title and CTA",
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="14px 20px">
      <mj-column>
        <mj-image src="https://placehold.co/560x260/0b1f5d/ffffff?text=Hero+Image" alt="Hero image" width="560px" padding="0" />
        <mj-spacer height="12px" />
        <mj-text mj-class="t-h1">{{hero_image_title}}</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">{{hero_image_subtext}}</mj-text>
        <mj-spacer height="12px" />
        <mj-button mj-class="btn-secondary" href="{{hero_image_cta_url}}">Learn more →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "section-band",
    name: "Section Band",
    icon: "📍",
    category: "Layout",
    desc: "Tinted section header with chip",
    mjml: `    <mj-section background-color="%%TINT_BLUE%%" padding="18px 24px">
      <mj-column width="70%">
        <mj-text mj-class="t-h2">📍 Local highlights in {{city}}</mj-text>
        <mj-spacer height="4px" />
        <mj-text mj-class="t-muted">Two picks near you.</mj-text>
      </mj-column>
      <mj-column width="30%">
        <mj-button mj-class="chip" href="{{local_section_url}}" align="right">LOCAL</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "grid-1up",
    name: "Grid: 1-up Card",
    icon: "▪️",
    category: "Layout",
    desc: "Single featured card",
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="20px 24px">
      <mj-column>
        <mj-text mj-class="t-h2" color="%%BRAND%%">{{grid1_title}}</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">{{grid1_desc}}</mj-text>
        <mj-spacer height="14px" />
        <mj-button mj-class="btn-primary" href="{{grid1_url}}">Open →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "grid-2up",
    name: "Grid: 2-up Cards",
    icon: "▪️▪️",
    category: "Layout",
    desc: "Two side-by-side cards",
    repeatable: {
      perRow: 2,
      baseCount: 2,
      sectionAttrs: 'background-color="%%SURFACE%%" padding="12px 18px"',
      itemFn: i => `
      <mj-column width="50%" padding="8px 6px">
        <mj-text mj-class="t-h2" color="%%BRAND%%">{{grid2_${i}_title}}</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">{{grid2_${i}_desc}}</mj-text>
        <mj-spacer height="12px" />
        <mj-button mj-class="btn-primary" href="{{grid2_${i}_url}}">Open →</mj-button>
      </mj-column>`
    },
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="12px 18px">
      <mj-column width="50%" padding="8px 6px">
        <mj-text mj-class="t-h2" color="%%BRAND%%">{{grid2_1_title}}</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">{{grid2_1_desc}}</mj-text>
        <mj-spacer height="12px" />
        <mj-button mj-class="btn-primary" href="{{grid2_1_url}}">Open →</mj-button>
      </mj-column>
      <mj-column width="50%" padding="8px 6px">
        <mj-text mj-class="t-h2" color="%%BRAND%%">{{grid2_2_title}}</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">{{grid2_2_desc}}</mj-text>
        <mj-spacer height="12px" />
        <mj-button mj-class="btn-primary" href="{{grid2_2_url}}">Open →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "grid-3up",
    name: "Grid: 3-up Categories",
    icon: "🧭",
    category: "Layout",
    desc: "Three category cards with images",
    repeatable: {
      perRow: 3,
      baseCount: 3,
      headerMjml: `    <mj-section background-color="%%TINT_VIOLET%%" padding="16px 20px">
      <mj-column>
        <mj-text mj-class="t-h2">🧭 Explore categories</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">A fast way to browse when you're not sure what to open.</mj-text>
      </mj-column>
    </mj-section>`,
      sectionAttrs: 'background-color="%%SURFACE%%" padding="6px 14px 10px 14px"',
      itemFn: i => {
        const colors = ['e6f0ff', 'efe9ff', 'e8f8ee', 'fff3e0', 'fce4ec', 'e0f7fa'];
        return `
      <mj-column width="33.33%" padding="8px 6px">
        <mj-image src="https://placehold.co/160x100/${colors[(i - 1) % colors.length]}/0b1f5d?text=Cat+${i}" alt="Category" width="160px" padding="0" align="center" />
        <mj-spacer height="10px" />
        <mj-text align="center" font-weight="900">{{cat_${i}_title}}</mj-text>
        <mj-spacer height="8px" />
        <mj-button mj-class="btn-link" href="{{cat_${i}_url}}" align="center">Browse →</mj-button>
      </mj-column>`;
      }
    },
    mjml: `    <mj-section background-color="%%TINT_VIOLET%%" padding="16px 20px">
      <mj-column>
        <mj-text mj-class="t-h2">🧭 Explore categories</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">A fast way to browse when you're not sure what to open.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="6px 14px 10px 14px">
      <mj-column width="33.33%" padding="8px 6px">
        <mj-image src="https://placehold.co/160x100/e6f0ff/0b1f5d?text=Cat+1" alt="Category" width="160px" padding="0" align="center" />
        <mj-spacer height="10px" />
        <mj-text align="center" font-weight="900">{{cat_1_title}}</mj-text>
        <mj-spacer height="8px" />
        <mj-button mj-class="btn-link" href="{{cat_1_url}}" align="center">Browse →</mj-button>
      </mj-column>
      <mj-column width="33.33%" padding="8px 6px">
        <mj-image src="https://placehold.co/160x100/e6f0ff/0b1f5d?text=Cat+2" alt="Category" width="160px" padding="0" align="center" />
        <mj-spacer height="10px" />
        <mj-text align="center" font-weight="900">{{cat_2_title}}</mj-text>
        <mj-spacer height="8px" />
        <mj-button mj-class="btn-link" href="{{cat_2_url}}" align="center">Browse →</mj-button>
      </mj-column>
      <mj-column width="33.33%" padding="8px 6px">
        <mj-image src="https://placehold.co/160x100/e6f0ff/0b1f5d?text=Cat+3" alt="Category" width="160px" padding="0" align="center" />
        <mj-spacer height="10px" />
        <mj-text align="center" font-weight="900">{{cat_3_title}}</mj-text>
        <mj-spacer height="8px" />
        <mj-button mj-class="btn-link" href="{{cat_3_url}}" align="center">Browse →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "card-1up-image",
    name: "Card: 1-up with Image",
    icon: "🖼️",
    category: "Cards",
    desc: "Full-width card with large image",
    mjml: `    <mj-section background-color="%%BG%%" padding="8px 24px">
      <mj-column padding="0">
        <mj-image src="https://placehold.co/552x240/e6f0ff/0b1f5d?text=Event+Banner" alt="Event" width="552px" border-radius="10px 10px 0 0" />
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="16px 24px 20px">
      <mj-column>
        <mj-text mj-class="t-h1" color="%%BRAND%%">{{card_img_title}}</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">🗓 {{card_img_dates}} · 📍 {{card_img_venue}}</mj-text>
        <mj-spacer height="12px" />
        <mj-button mj-class="btn-primary" href="{{card_img_url}}">View Details →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "card-1up-logo",
    name: "Card: 1-up with Logo",
    icon: "🏢",
    category: "Cards",
    desc: "Card with small logo and event info",
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="20px 24px">
      <mj-column width="72px" padding="0 16px 0 0" vertical-align="top">
        <mj-image src="https://placehold.co/64x64/e6f0ff/0b1f5d?text=Logo" alt="Logo" width="64px" border-radius="10px" />
      </mj-column>
      <mj-column padding="0" vertical-align="top">
        <mj-text mj-class="t-h2" color="%%BRAND%%">{{logo_card_title}}</mj-text>
        <mj-spacer height="4px" />
        <mj-text mj-class="t-muted">🗓 {{logo_card_dates}}</mj-text>
        <mj-text mj-class="t-muted">📍 {{logo_card_venue}}</mj-text>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-primary" href="{{logo_card_url}}">Interested ✅</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "card-2up-image",
    name: "Cards: 2-up with Images",
    icon: "🖼️🖼️",
    category: "Cards",
    desc: "Two cards side-by-side with images",
    repeatable: {
      perRow: 2,
      baseCount: 2,
      sectionAttrs: 'background-color="%%BG%%" padding="8px 18px 12px"',
      itemFn: i => {
        const colors = ['e6f0ff', 'efe9ff', 'e8f8ee', 'fff3e0', 'fce4ec', 'e0f7fa'];
        return `
      <mj-column width="50%" padding="8px 6px">
        <mj-image src="https://placehold.co/260x150/${colors[(i - 1) % colors.length]}/0b1f5d?text=Event+${i}" alt="Event" width="260px" border-radius="8px" />
        <mj-spacer height="10px" />
        <mj-text mj-class="t-h2" color="%%BRAND%%">{{card2i_${i}_title}}</mj-text>
        <mj-spacer height="4px" />
        <mj-text mj-class="t-muted">🗓 {{card2i_${i}_dates}}</mj-text>
        <mj-text mj-class="t-muted">📍 {{card2i_${i}_venue}}</mj-text>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-primary" href="{{card2i_${i}_url}}">View →</mj-button>
      </mj-column>`;
      }
    },
    mjml: `    <mj-section background-color="%%BG%%" padding="8px 18px 12px">
      <mj-column width="50%" padding="8px 6px">
        <mj-image src="https://placehold.co/260x150/e6f0ff/0b1f5d?text=Event+1" alt="Event" width="260px" border-radius="8px" />
        <mj-spacer height="10px" />
        <mj-text mj-class="t-h2" color="%%BRAND%%">{{card2i_1_title}}</mj-text>
        <mj-spacer height="4px" />
        <mj-text mj-class="t-muted">🗓 {{card2i_1_dates}}</mj-text>
        <mj-text mj-class="t-muted">📍 {{card2i_1_venue}}</mj-text>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-primary" href="{{card2i_1_url}}">View →</mj-button>
      </mj-column>
      <mj-column width="50%" padding="8px 6px">
        <mj-image src="https://placehold.co/260x150/efe9ff/0b1f5d?text=Event+2" alt="Event" width="260px" border-radius="8px" />
        <mj-spacer height="10px" />
        <mj-text mj-class="t-h2" color="%%BRAND%%">{{card2i_2_title}}</mj-text>
        <mj-spacer height="4px" />
        <mj-text mj-class="t-muted">🗓 {{card2i_2_dates}}</mj-text>
        <mj-text mj-class="t-muted">📍 {{card2i_2_venue}}</mj-text>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-primary" href="{{card2i_2_url}}">View →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "card-2up-logo",
    name: "Cards: 2-up with Logos",
    icon: "🏢🏢",
    category: "Cards",
    desc: "Two cards with logo-style images",
    repeatable: {
      perRow: 2,
      baseCount: 2,
      sectionAttrs: 'background-color="%%BG%%" padding="8px 18px 12px"',
      itemFn: i => {
        const colors = ['e6f0ff', 'efe9ff', 'e8f8ee', 'fff3e0'];
        return `
      <mj-column width="50%" padding="8px 6px" background-color="%%SURFACE%%">
        <mj-image src="https://placehold.co/56x56/${colors[(i - 1) % colors.length]}/0b1f5d?text=L${i}" alt="Logo" width="56px" border-radius="10px" padding="16px 16px 8px" align="left" />
        <mj-text mj-class="t-h2" color="%%BRAND%%" padding="0 16px">{{logo2_${i}_title}}</mj-text>
        <mj-spacer height="4px" />
        <mj-text mj-class="t-muted" padding="0 16px">{{logo2_${i}_meta}}</mj-text>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-secondary" href="{{logo2_${i}_url}}" padding="0 16px 16px">Details →</mj-button>
      </mj-column>`;
      }
    },
    mjml: `    <mj-section background-color="%%BG%%" padding="8px 18px 12px">
      <mj-column width="50%" padding="8px 6px" background-color="%%SURFACE%%">
        <mj-image src="https://placehold.co/56x56/e6f0ff/0b1f5d?text=L1" alt="Logo" width="56px" border-radius="10px" padding="16px 16px 8px" align="left" />
        <mj-text mj-class="t-h2" color="%%BRAND%%" padding="0 16px">{{logo2_1_title}}</mj-text>
        <mj-spacer height="4px" />
        <mj-text mj-class="t-muted" padding="0 16px">{{logo2_1_meta}}</mj-text>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-secondary" href="{{logo2_1_url}}" padding="0 16px 16px">Details →</mj-button>
      </mj-column>
      <mj-column width="50%" padding="8px 6px" background-color="%%SURFACE%%">
        <mj-image src="https://placehold.co/56x56/efe9ff/0b1f5d?text=L2" alt="Logo" width="56px" border-radius="10px" padding="16px 16px 8px" align="left" />
        <mj-text mj-class="t-h2" color="%%BRAND%%" padding="0 16px">{{logo2_2_title}}</mj-text>
        <mj-spacer height="4px" />
        <mj-text mj-class="t-muted" padding="0 16px">{{logo2_2_meta}}</mj-text>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-secondary" href="{{logo2_2_url}}" padding="0 16px 16px">Details →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "card-3up-image",
    name: "Cards: 3-up with Images",
    icon: "🖼️×3",
    category: "Cards",
    desc: "Three cards with top images",
    repeatable: {
      perRow: 3,
      baseCount: 3,
      sectionAttrs: 'background-color="%%BG%%" padding="8px 14px 12px"',
      itemFn: i => {
        const colors = ['e6f0ff', 'efe9ff', 'e8f8ee', 'fff3e0', 'fce4ec', 'e0f7fa'];
        return `
      <mj-column width="33.33%" padding="8px 5px">
        <mj-image src="https://placehold.co/170x110/${colors[(i - 1) % colors.length]}/0b1f5d?text=Img+${i}" alt="Event" width="170px" border-radius="8px 8px 0 0" />
        <mj-text mj-class="t-h2" color="%%BRAND%%" padding="10px 10px 0">{{card3i_${i}_title}}</mj-text>
        <mj-text mj-class="t-muted" padding="4px 10px 0">{{card3i_${i}_meta}}</mj-text>
        <mj-spacer height="8px" />
        <mj-button mj-class="btn-link" href="{{card3i_${i}_url}}" padding="0 10px 12px">View →</mj-button>
      </mj-column>`;
      }
    },
    mjml: `    <mj-section background-color="%%BG%%" padding="8px 14px 12px">
      <mj-column width="33.33%" padding="8px 5px">
        <mj-image src="https://placehold.co/170x110/e6f0ff/0b1f5d?text=Img+1" alt="Event" width="170px" border-radius="8px 8px 0 0" />
        <mj-text mj-class="t-h2" color="%%BRAND%%" padding="10px 10px 0">{{card3i_1_title}}</mj-text>
        <mj-text mj-class="t-muted" padding="4px 10px 0">{{card3i_1_meta}}</mj-text>
        <mj-spacer height="8px" />
        <mj-button mj-class="btn-link" href="{{card3i_1_url}}" padding="0 10px 12px">View →</mj-button>
      </mj-column>
      <mj-column width="33.33%" padding="8px 5px">
        <mj-image src="https://placehold.co/170x110/efe9ff/0b1f5d?text=Img+2" alt="Event" width="170px" border-radius="8px 8px 0 0" />
        <mj-text mj-class="t-h2" color="%%BRAND%%" padding="10px 10px 0">{{card3i_2_title}}</mj-text>
        <mj-text mj-class="t-muted" padding="4px 10px 0">{{card3i_2_meta}}</mj-text>
        <mj-spacer height="8px" />
        <mj-button mj-class="btn-link" href="{{card3i_2_url}}" padding="0 10px 12px">View →</mj-button>
      </mj-column>
      <mj-column width="33.33%" padding="8px 5px">
        <mj-image src="https://placehold.co/170x110/e8f8ee/0b1f5d?text=Img+3" alt="Event" width="170px" border-radius="8px 8px 0 0" />
        <mj-text mj-class="t-h2" color="%%BRAND%%" padding="10px 10px 0">{{card3i_3_title}}</mj-text>
        <mj-text mj-class="t-muted" padding="4px 10px 0">{{card3i_3_meta}}</mj-text>
        <mj-spacer height="8px" />
        <mj-button mj-class="btn-link" href="{{card3i_3_url}}" padding="0 10px 12px">View →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "card-3up-text",
    name: "Cards: 3-up Text Only",
    icon: "📝×3",
    category: "Cards",
    desc: "Three compact text-only cards",
    repeatable: {
      perRow: 3,
      baseCount: 3,
      sectionAttrs: 'background-color="%%BG%%" padding="8px 14px 12px"',
      itemFn: i => `
      <mj-column width="33.33%" padding="8px 5px" background-color="%%SURFACE%%">
        <mj-text mj-class="t-label" padding="14px 14px 0" color="%%LINK%%">{{card3t_${i}_tag}}</mj-text>
        <mj-text mj-class="t-h2" color="%%BRAND%%" padding="6px 14px 0">{{card3t_${i}_title}}</mj-text>
        <mj-text mj-class="t-muted" padding="4px 14px 0">{{card3t_${i}_meta}}</mj-text>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-link" href="{{card3t_${i}_url}}" padding="0 14px 14px">Open →</mj-button>
      </mj-column>`
    },
    mjml: `    <mj-section background-color="%%BG%%" padding="8px 14px 12px">
      <mj-column width="33.33%" padding="8px 5px" background-color="%%SURFACE%%">
        <mj-text mj-class="t-label" padding="14px 14px 0" color="%%LINK%%">{{card3t_1_tag}}</mj-text>
        <mj-text mj-class="t-h2" color="%%BRAND%%" padding="6px 14px 0">{{card3t_1_title}}</mj-text>
        <mj-text mj-class="t-muted" padding="4px 14px 0">{{card3t_1_meta}}</mj-text>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-link" href="{{card3t_1_url}}" padding="0 14px 14px">Open →</mj-button>
      </mj-column>
      <mj-column width="33.33%" padding="8px 5px" background-color="%%SURFACE%%">
        <mj-text mj-class="t-label" padding="14px 14px 0" color="%%LINK%%">{{card3t_2_tag}}</mj-text>
        <mj-text mj-class="t-h2" color="%%BRAND%%" padding="6px 14px 0">{{card3t_2_title}}</mj-text>
        <mj-text mj-class="t-muted" padding="4px 14px 0">{{card3t_2_meta}}</mj-text>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-link" href="{{card3t_2_url}}" padding="0 14px 14px">Open →</mj-button>
      </mj-column>
      <mj-column width="33.33%" padding="8px 5px" background-color="%%SURFACE%%">
        <mj-text mj-class="t-label" padding="14px 14px 0" color="%%LINK%%">{{card3t_3_tag}}</mj-text>
        <mj-text mj-class="t-h2" color="%%BRAND%%" padding="6px 14px 0">{{card3t_3_title}}</mj-text>
        <mj-text mj-class="t-muted" padding="4px 14px 0">{{card3t_3_meta}}</mj-text>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-link" href="{{card3t_3_url}}" padding="0 14px 14px">Open →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "card-1up-bordered",
    name: "Card: Bordered Text",
    icon: "🔲",
    category: "Cards",
    desc: "Single card with border outline",
    mjml: `    <mj-wrapper background-color="%%BG%%" padding="8px 24px">
      <mj-section background-color="%%SURFACE%%" padding="20px 20px" border="1px solid %%BORDER%%" border-radius="10px">
        <mj-column>
          <mj-text mj-class="t-label" color="%%LINK%%">{{bcard_tag}}</mj-text>
          <mj-spacer height="6px" />
          <mj-text mj-class="t-h1" color="%%BRAND%%">{{bcard_title}}</mj-text>
          <mj-spacer height="6px" />
          <mj-text mj-class="t-muted">{{bcard_desc}}</mj-text>
          <mj-spacer height="6px" />
          <mj-text mj-class="t-muted">🗓 {{bcard_dates}} · 📍 {{bcard_venue}}</mj-text>
          <mj-spacer height="14px" />
          <mj-button mj-class="btn-primary" href="{{bcard_url}}">Learn More →</mj-button>
        </mj-column>
      </mj-section>
    </mj-wrapper>`
  },
  {
    id: "card-2up-card-image",
    name: "Cards: 2-up Card Style",
    icon: "🃏🃏",
    category: "Cards",
    desc: "Two bordered cards with top images",
    repeatable: {
      perRow: 2,
      baseCount: 2,
      sectionAttrs: 'background-color="%%BG%%" padding="8px 18px 12px"',
      gapColumn: '<mj-column width="4%"><mj-spacer height="1px" /></mj-column>',
      itemFn: i => {
        const colors = ['e6f0ff', 'efe9ff', 'e8f8ee', 'fff3e0', 'fce4ec', 'e0f7fa'];
        return `
      <mj-column css-class="card-gap" width="48%" padding="8px 0" background-color="%%SURFACE%%" border="1px solid %%BORDER%%" border-radius="10px">
        <mj-image src="https://placehold.co/260x140/${colors[(i - 1) % colors.length]}/0b1f5d?text=Card+${i}" alt="Event" width="260px" border-radius="10px 10px 0 0" padding="0" />
        <mj-text mj-class="t-h2" color="%%BRAND%%" padding="12px 16px 0">{{ccard_${i}_title}}</mj-text>
        <mj-text mj-class="t-muted" padding="4px 16px 0">{{ccard_${i}_meta}}</mj-text>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-primary" href="{{ccard_${i}_url}}" padding="0 16px 16px">View →</mj-button>
      </mj-column>`;
      }
    },
    mjml: `    <mj-section background-color="%%BG%%" padding="8px 18px 12px">
      <mj-column css-class="card-gap" width="48%" padding="8px 0" background-color="%%SURFACE%%" border="1px solid %%BORDER%%" border-radius="10px">
        <mj-image src="https://placehold.co/260x140/e6f0ff/0b1f5d?text=Card+1" alt="Event" width="260px" border-radius="10px 10px 0 0" padding="0" />
        <mj-text mj-class="t-h2" color="%%BRAND%%" padding="12px 16px 0">{{ccard_1_title}}</mj-text>
        <mj-text mj-class="t-muted" padding="4px 16px 0">{{ccard_1_meta}}</mj-text>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-primary" href="{{ccard_1_url}}" padding="0 16px 16px">View →</mj-button>
      </mj-column>
      <mj-column width="4%"><mj-spacer height="1px" /></mj-column>
      <mj-column css-class="card-gap" width="48%" padding="8px 0" background-color="%%SURFACE%%" border="1px solid %%BORDER%%" border-radius="10px">
        <mj-image src="https://placehold.co/260x140/efe9ff/0b1f5d?text=Card+2" alt="Event" width="260px" border-radius="10px 10px 0 0" padding="0" />
        <mj-text mj-class="t-h2" color="%%BRAND%%" padding="12px 16px 0">{{ccard_2_title}}</mj-text>
        <mj-text mj-class="t-muted" padding="4px 16px 0">{{ccard_2_meta}}</mj-text>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-primary" href="{{ccard_2_url}}" padding="0 16px 16px">View →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "event-simple",
    name: "Event Card (Simple)",
    icon: "📋",
    category: "Events",
    desc: "Single event with emoji date/venue",
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="20px 24px">
      <mj-column>
        <mj-text mj-class="t-h2" color="%%BRAND%%">{{event_title}}</mj-text>
        <mj-spacer height="8px" />
        <mj-text mj-class="t-muted">🗓 {{event_dates}}</mj-text>
        <mj-spacer height="2px" />
        <mj-text mj-class="t-muted">📍 {{event_venue}}</mj-text>
        <mj-spacer height="12px" />
        <mj-button mj-class="btn-primary" href="{{event_cta_url}}">Interested ✅</mj-button>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-link" href="{{event_url}}">Details →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "event-stacked",
    name: "Event Cards (2-up Stacked)",
    icon: "📋📋",
    category: "Events",
    desc: "Two event cards side by side",
    repeatable: {
      perRow: 2,
      baseCount: 2,
      sectionAttrs: 'background-color="%%SURFACE%%" padding="6px 20px 10px 20px"',
      itemFn: i => `
      <mj-column width="50%" padding="8px 6px">
        <mj-text mj-class="t-h2" color="%%BRAND%%">{{event${i}_title}}</mj-text>
        <mj-spacer height="8px" />
        <mj-text mj-class="t-muted">🗓 {{event${i}_dates}}</mj-text>
        <mj-spacer height="2px" />
        <mj-text mj-class="t-muted">📍 {{event${i}_venue}}</mj-text>
        <mj-spacer height="12px" />
        <mj-button mj-class="btn-primary" href="{{event${i}_cta_url}}">Interested ✅</mj-button>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-link" href="{{event${i}_url}}">Details →</mj-button>
      </mj-column>`
    },
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="6px 20px 10px 20px">
      <mj-column width="50%" padding="8px 6px">
        <mj-text mj-class="t-h2" color="%%BRAND%%">{{event1_title}}</mj-text>
        <mj-spacer height="8px" />
        <mj-text mj-class="t-muted">🗓 {{event1_dates}}</mj-text>
        <mj-spacer height="2px" />
        <mj-text mj-class="t-muted">📍 {{event1_venue}}</mj-text>
        <mj-spacer height="12px" />
        <mj-button mj-class="btn-primary" href="{{event1_cta_url}}">Interested ✅</mj-button>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-link" href="{{event1_url}}">Details →</mj-button>
      </mj-column>
      <mj-column width="50%" padding="8px 6px">
        <mj-text mj-class="t-h2" color="%%BRAND%%">{{event2_title}}</mj-text>
        <mj-spacer height="8px" />
        <mj-text mj-class="t-muted">🗓 {{event2_dates}}</mj-text>
        <mj-spacer height="2px" />
        <mj-text mj-class="t-muted">📍 {{event2_venue}}</mj-text>
        <mj-spacer height="12px" />
        <mj-button mj-class="btn-primary" href="{{event2_cta_url}}">Interested ✅</mj-button>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-link" href="{{event2_url}}">Details →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "event-aligned",
    name: "Event Card (Aligned Icons)",
    icon: "📐",
    category: "Events",
    desc: "Wrapper-based aligned icon rows",
    mjml: `    <mj-wrapper background-color="%%SURFACE%%" border="1px solid %%BORDER%%" padding="0">
      <mj-section background-color="%%SURFACE%%" padding="16px 20px 0 20px">
        <mj-column>
          <mj-text mj-class="t-h2" color="%%BRAND%%">{{event_aligned_title}}</mj-text>
        </mj-column>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="10px 20px 0 20px">
        <mj-group>
          <mj-column width="26px" padding="0 8px 0 0">
            <mj-text align="center" mj-class="t-muted">🗓</mj-text>
          </mj-column>
          <mj-column padding="0">
            <mj-text mj-class="t-muted">{{event_aligned_dates}}</mj-text>
          </mj-column>
        </mj-group>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="6px 20px 0 20px">
        <mj-group>
          <mj-column width="26px" padding="0 8px 0 0">
            <mj-text align="center" mj-class="t-muted">📍</mj-text>
          </mj-column>
          <mj-column padding="0">
            <mj-text mj-class="t-muted">{{event_aligned_venue}}</mj-text>
          </mj-column>
        </mj-group>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="12px 20px 16px 20px">
        <mj-column>
          <mj-button mj-class="btn-primary" href="{{event_aligned_cta_url}}">Interested ✅</mj-button>
          <mj-spacer height="10px" />
          <mj-button mj-class="btn-link" href="{{event_aligned_url}}">Details →</mj-button>
        </mj-column>
      </mj-section>
    </mj-wrapper>`
  },
  {
    id: "event-row",
    name: "Event Row (Compact)",
    icon: "📝",
    category: "Events",
    desc: "Compact list row with side CTA",
    mjml: `    <mj-wrapper background-color="%%SURFACE%%" border="1px solid %%BORDER%%" padding="0">
      <mj-section background-color="%%SURFACE%%" padding="14px 20px">
        <mj-group>
          <mj-column width="70%" padding="0 10px 0 0">
            <mj-text font-weight="900" color="%%BRAND%%">{{event_row_title}}</mj-text>
            <mj-spacer height="6px" />
            <mj-text mj-class="t-muted">🗓 {{event_row_dates}}</mj-text>
            <mj-spacer height="2px" />
            <mj-text mj-class="t-muted">📍 {{event_row_location}}</mj-text>
          </mj-column>
          <mj-column width="30%" padding="0">
            <mj-button mj-class="btn-secondary" href="{{event_row_url}}" align="right">Open →</mj-button>
          </mj-column>
        </mj-group>
      </mj-section>
    </mj-wrapper>`
  },
  {
    id: "promo-strip",
    name: "Promo Strip",
    icon: "🎯",
    category: "Marketing",
    desc: "Dark promo strip with CTA",
    mjml: `    <mj-section background-color="%%BRAND%%" padding="14px 20px">
      <mj-column width="70%">
        <mj-text color="#dbeafe" font-weight="900">Get started today</mj-text>
        <mj-spacer height="6px" />
        <mj-text color="#dbeafe">A small perk for early registrations.</mj-text>
      </mj-column>
      <mj-column width="30%">
        <mj-button mj-class="btn-primary" href="{{promo_strip_url}}" align="right">Claim →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "image-card",
    name: "Image Card (Featured)",
    icon: "🖼️",
    category: "Marketing",
    desc: "Featured image card with meta",
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="14px 20px 18px 20px">
      <mj-column>
        <mj-image src="https://placehold.co/560x260/e6f0ff/0b1f5d?text=Featured" alt="Featured" width="560px" padding="0" />
        <mj-spacer height="12px" />
        <mj-text mj-class="t-h1">{{featured_title}}</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">{{featured_meta}}</mj-text>
        <mj-spacer height="12px" />
        <mj-button mj-class="btn-secondary" href="{{featured_url}}">Open →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "gallery-2up",
    name: "Gallery (2-up)",
    icon: "🎨",
    category: "Marketing",
    desc: "Two image gallery cards",
    repeatable: {
      perRow: 2,
      baseCount: 2,
      sectionAttrs: 'background-color="%%SURFACE%%" padding="6px 14px 10px 14px"',
      itemFn: i => {
        const colors = ['e6f0ff', 'efe9ff', 'e8f8ee', 'fff3e0'];
        return `
      <mj-column width="50%" padding="8px 6px">
        <mj-image src="https://placehold.co/260x160/${colors[(i - 1) % colors.length]}/0b1f5d?text=Photo+${i}" alt="Gallery image" width="260px" padding="0" />
        <mj-spacer height="10px" />
        <mj-text font-weight="900">{{gallery_${i}_title}}</mj-text>
      </mj-column>`;
      }
    },
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="6px 14px 10px 14px">
      <mj-column width="50%" padding="8px 6px">
        <mj-image src="https://placehold.co/260x160/e6f0ff/0b1f5d?text=Photo+1" alt="Gallery image" width="260px" padding="0" />
        <mj-spacer height="10px" />
        <mj-text font-weight="900">{{gallery_1_title}}</mj-text>
      </mj-column>
      <mj-column width="50%" padding="8px 6px">
        <mj-image src="https://placehold.co/260x160/efe9ff/0b1f5d?text=Photo+2" alt="Gallery image" width="260px" padding="0" />
        <mj-spacer height="10px" />
        <mj-text font-weight="900">{{gallery_2_title}}</mj-text>
      </mj-column>
    </mj-section>`
  },
  {
    id: "sponsor-strip",
    name: "Sponsor Strip",
    icon: "🤝",
    category: "Marketing",
    desc: "4-up sponsor logo strip",
    mjml: `    <mj-wrapper background-color="%%SURFACE%%" border="1px solid %%BORDER%%" padding="0">
      <mj-section background-color="%%SURFACE%%" padding="14px 20px 0 20px">
        <mj-column>
          <mj-text mj-class="t-label">SPONSORS</mj-text>
        </mj-column>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="10px 14px 16px 14px">
        <mj-group>
          <mj-column width="25%" padding="0 6px">
            <mj-image src="https://placehold.co/120x60/f3f4f6/111827?text=Logo+1" alt="Sponsor" width="120px" padding="0" align="center" />
          </mj-column>
          <mj-column width="25%" padding="0 6px">
            <mj-image src="https://placehold.co/120x60/f3f4f6/111827?text=Logo+2" alt="Sponsor" width="120px" padding="0" align="center" />
          </mj-column>
          <mj-column width="25%" padding="0 6px">
            <mj-image src="https://placehold.co/120x60/f3f4f6/111827?text=Logo+3" alt="Sponsor" width="120px" padding="0" align="center" />
          </mj-column>
          <mj-column width="25%" padding="0 6px">
            <mj-image src="https://placehold.co/120x60/f3f4f6/111827?text=Logo+4" alt="Sponsor" width="120px" padding="0" align="center" />
          </mj-column>
        </mj-group>
      </mj-section>
    </mj-wrapper>`
  },
  {
    id: "speaker-grid",
    name: "Speaker Grid",
    icon: "🎤",
    category: "Conference",
    desc: "3-up speaker avatars with names",
    mjml: `    <mj-section background-color="%%TINT_VIOLET%%" padding="16px 20px">
      <mj-column>
        <mj-text mj-class="t-h2">🎤 Speaker spotlight</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">Featured speakers at this event.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="6px 14px 12px 14px">
      <mj-column width="33.33%" padding="8px 6px">
        <mj-image src="https://placehold.co/56x56/e6f0ff/0b1f5d?text=S1" alt="Speaker" width="56px" padding="0" align="center" />
        <mj-spacer height="8px" />
        <mj-text align="center" font-weight="900">{{spk_1_name}}</mj-text>
        <mj-text align="center" mj-class="t-muted">{{spk_1_role}}</mj-text>
      </mj-column>
      <mj-column width="33.33%" padding="8px 6px">
        <mj-image src="https://placehold.co/56x56/efe9ff/0b1f5d?text=S2" alt="Speaker" width="56px" padding="0" align="center" />
        <mj-spacer height="8px" />
        <mj-text align="center" font-weight="900">{{spk_2_name}}</mj-text>
        <mj-text align="center" mj-class="t-muted">{{spk_2_role}}</mj-text>
      </mj-column>
      <mj-column width="33.33%" padding="8px 6px">
        <mj-image src="https://placehold.co/56x56/e8f8ee/0b1f5d?text=S3" alt="Speaker" width="56px" padding="0" align="center" />
        <mj-spacer height="8px" />
        <mj-text align="center" font-weight="900">{{spk_3_name}}</mj-text>
        <mj-text align="center" mj-class="t-muted">{{spk_3_role}}</mj-text>
      </mj-column>
    </mj-section>`
  },
  {
    id: "schedule",
    name: "Schedule",
    icon: "📅",
    category: "Conference",
    desc: "Bordered schedule rows with time slots",
    mjml: `    <mj-wrapper background-color="%%SURFACE%%" border="1px solid %%BORDER%%" padding="0">
      <mj-section background-color="%%SURFACE%%" padding="14px 20px 0 20px">
        <mj-column><mj-text mj-class="t-label">SCHEDULE</mj-text></mj-column>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="10px 20px 0 20px">
        <mj-group>
          <mj-column width="22%" padding="0 10px 0 0">
            <mj-text mj-class="t-label" color="%%TEXT%%">{{slot_1_time}}</mj-text>
          </mj-column>
          <mj-column width="78%" padding="0">
            <mj-text font-weight="700">{{slot_1_title}}</mj-text>
            <mj-text mj-class="t-muted">{{slot_1_note}}</mj-text>
          </mj-column>
        </mj-group>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="14px 20px 16px 20px">
        <mj-column>
          <mj-button mj-class="btn-primary" href="{{conf_register_url}}">Register now →</mj-button>
        </mj-column>
      </mj-section>
    </mj-wrapper>`
  },
  {
    id: "countdown",
    name: "Countdown",
    icon: "⏳",
    category: "Conference",
    desc: "Countdown tiles (days/hours/min/sec)",
    mjml: `    <mj-section background-color="%%TINT_BLUE%%" padding="16px 20px">
      <mj-column>
        <mj-text mj-class="t-h2">⏳ Starts soon</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">Placeholder tiles for countdown.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="14px 14px 18px 14px">
      <mj-column width="25%" padding="0 6px">
        <mj-text align="center" font-size="24px" line-height="28px" font-weight="900">{{dd}}</mj-text>
        <mj-text align="center" mj-class="t-muted">Days</mj-text>
      </mj-column>
      <mj-column width="25%" padding="0 6px">
        <mj-text align="center" font-size="24px" line-height="28px" font-weight="900">{{hh}}</mj-text>
        <mj-text align="center" mj-class="t-muted">Hours</mj-text>
      </mj-column>
      <mj-column width="25%" padding="0 6px">
        <mj-text align="center" font-size="24px" line-height="28px" font-weight="900">{{mm}}</mj-text>
        <mj-text align="center" mj-class="t-muted">Minutes</mj-text>
      </mj-column>
      <mj-column width="25%" padding="0 6px">
        <mj-text align="center" font-size="24px" line-height="28px" font-weight="900">{{ss}}</mj-text>
        <mj-text align="center" mj-class="t-muted">Seconds</mj-text>
      </mj-column>
    </mj-section>`
  },
  {
    id: "ticket-cta",
    name: "Ticket CTA",
    icon: "🎟",
    category: "Conference",
    desc: "Ticket pricing with CTA",
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="0 20px 18px 20px">
      <mj-column>
        <mj-text mj-class="t-h2">🎟 Tickets</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">From {{ticket_price}} • Limited availability</mj-text>
        <mj-spacer height="12px" />
        <mj-button mj-class="btn-primary" href="{{ticket_url}}">Get tickets →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "stats-tiles",
    name: "Stats Tiles",
    icon: "👀",
    category: "Data",
    desc: "2-up stat tiles with numbers",
    mjml: `    <mj-section background-color="%%TINT_ORANGE%%" padding="18px 20px">
      <mj-column>
        <mj-text mj-class="t-h1" align="center" color="#7c2d12">👀 Who's visiting {{city}}?</mj-text>
        <mj-spacer height="8px" />
        <mj-text align="center" color="#7c2d12">A quick snapshot of professional movement.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="14px 14px 12px 14px">
      <mj-column width="50%" padding="0 6px">
        <mj-text mj-class="t-label">PROFESSIONALS</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-h1">👥 {{pro_count}}</mj-text>
      </mj-column>
      <mj-column width="50%" padding="0 6px">
        <mj-text mj-class="t-label">COMPANIES</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-h1">🏢 {{company_count}}</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="0 20px 18px 20px">
      <mj-column>
        <mj-button mj-class="btn-link" href="{{whos_coming_url}}">See who's coming →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "map-block",
    name: "Map Block",
    icon: "🗺️",
    category: "Data",
    desc: "Map image with address and link",
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="14px 20px 18px 20px">
      <mj-column>
        <mj-image src="https://placehold.co/560x200/e6f0ff/0b1f5d?text=Map+Preview" alt="Map" width="560px" padding="0" />
        <mj-spacer height="10px" />
        <mj-text font-weight="900">Venue</mj-text>
        <mj-spacer height="4px" />
        <mj-text mj-class="t-muted">{{map_address_1}}</mj-text>
        <mj-text mj-class="t-muted">{{map_address_2}}</mj-text>
        <mj-spacer height="10px" />
        <mj-button mj-class="btn-link" href="{{map_url}}">Open map →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "calendar-chip",
    name: "Calendar / Appointment",
    icon: "📅",
    category: "Data",
    desc: "Calendar tile with details + ICS",
    mjml: `    <mj-section background-color="%%TINT_VIOLET%%" padding="16px 20px">
      <mj-column>
        <mj-text mj-class="t-h2">📅 Appointment</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">Calendar chip + details + ICS link.</mj-text>
      </mj-column>
    </mj-section>
    <mj-wrapper background-color="%%SURFACE%%" border="1px solid %%BORDER%%" padding="0">
      <mj-section background-color="%%SURFACE%%" padding="14px 20px">
        <mj-column width="28%" padding="10px 12px 10px 0" background-color="%%TINT_BLUE%%" vertical-align="top">
          <mj-text mj-class="t-label" align="center" color="%%BRAND%%" padding="0">{{cal_month}}</mj-text>
          <mj-text align="center" font-size="26px" line-height="28px" font-weight="900" padding="4px 0 0 0">{{cal_day}}</mj-text>
          <mj-text mj-class="t-muted" align="center" padding="4px 0 0 0">{{cal_time}}</mj-text>
        </mj-column>
        <mj-column width="72%" padding="0 0 0 12px" vertical-align="top">
          <mj-text font-weight="900" padding="0">{{cal_title}}</mj-text>
          <mj-text mj-class="t-muted" padding="4px 0 0 0">{{cal_datetime_full}}</mj-text>
          <mj-text mj-class="t-muted" padding="4px 0 0 0">{{cal_location}}</mj-text>
          <mj-button mj-class="btn-link" align="left" padding="10px 0 0 0" href="{{cal_add_ics_url}}">
            Add to calendar (ICS) →
          </mj-button>
        </mj-column>
      </mj-section>
    </mj-wrapper>`
  },
  {
    id: "crash-alert",
    name: "Crash Alert + Code",
    icon: "⚠️",
    category: "Transactional",
    desc: "Error reporting with code block",
    mjml: `    <mj-section background-color="%%TINT_RED%%" padding="16px 20px">
      <mj-column>
        <mj-text mj-class="t-h2">⚠️ Application alert</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">Useful for incidents and error reporting.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="14px 20px 18px 20px">
      <mj-column>
        <mj-text mj-class="t-label">EXCEPTION</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-mono" background-color="%%TINT_BLUE%%" padding="10px">{{error_message}}</mj-text>
        <mj-spacer height="12px" />
        <mj-button mj-class="btn-primary" href="{{debug_url}}">Debug code →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "booking-confirm",
    name: "Booking Confirmation",
    icon: "✅",
    category: "Transactional",
    desc: "Key/value details + QR + map",
    mjml: `    <mj-section background-color="%%TINT_GREEN%%" padding="16px 20px">
      <mj-column>
        <mj-text mj-class="t-h2">✅ Booking confirmation</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">Key/value details, QR block, and map block.</mj-text>
      </mj-column>
    </mj-section>
    <mj-wrapper background-color="%%SURFACE%%" border="1px solid %%BORDER%%" padding="0">
      <mj-section background-color="%%SURFACE%%" padding="14px 20px">
        <mj-column><mj-text font-weight="900">Reservation: {{booking_ref}}</mj-text></mj-column>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="0 20px 10px 20px">
        <mj-column><mj-divider /></mj-column>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="10px 20px 0 20px">
        <mj-group>
          <mj-column width="35%" padding="0 10px 0 0"><mj-text mj-class="t-muted">Guest</mj-text></mj-column>
          <mj-column width="65%" padding="0"><mj-text font-weight="700">{{booking_guest}}</mj-text></mj-column>
        </mj-group>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="10px 20px 0 20px">
        <mj-group>
          <mj-column width="35%" padding="0 10px 0 0"><mj-text mj-class="t-muted">Dates</mj-text></mj-column>
          <mj-column width="65%" padding="0"><mj-text font-weight="700">{{booking_dates}}</mj-text></mj-column>
        </mj-group>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="10px 20px 16px 20px">
        <mj-group>
          <mj-column width="35%" padding="0 10px 0 0"><mj-text mj-class="t-muted">Location</mj-text></mj-column>
          <mj-column width="65%" padding="0"><mj-text font-weight="700">{{booking_location}}</mj-text></mj-column>
        </mj-group>
      </mj-section>
    </mj-wrapper>`
  },
  {
    id: "chat-preview",
    name: "Chat Preview",
    icon: "💬",
    category: "Transactional",
    desc: "Conversation bubbles with avatars",
    mjml: `    <mj-section background-color="%%TINT_VIOLET%%" padding="16px 20px">
      <mj-column>
        <mj-text mj-class="t-h2">💬 Conversation preview</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">A quick excerpt from a conversation.</mj-text>
      </mj-column>
    </mj-section>
    <mj-wrapper background-color="%%SURFACE%%" border="1px solid %%BORDER%%" padding="0">
      <mj-section background-color="%%SURFACE%%" padding="14px 20px 0 20px">
        <mj-group>
          <mj-column width="14%" padding="0 10px 0 0">
            <mj-image src="https://placehold.co/44x44/e6f0ff/0b1f5d?text=A" alt="Avatar" width="44px" padding="0" />
          </mj-column>
          <mj-column width="86%" padding="0">
            <mj-text mj-class="t-label">{{chat_left_name}}</mj-text>
            <mj-spacer height="6px" />
            <mj-text background-color="%%TINT_BLUE%%" padding="12px">{{chat_left_text}}</mj-text>
          </mj-column>
        </mj-group>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="10px 20px 0 20px">
        <mj-group>
          <mj-column width="14%" padding="0 10px 0 0"></mj-column>
          <mj-column width="86%" padding="0">
            <mj-text mj-class="t-label" align="right">{{chat_right_name}}</mj-text>
            <mj-spacer height="6px" />
            <mj-text background-color="%%TINT_GREEN%%" padding="12px" align="right">{{chat_right_text}}</mj-text>
          </mj-column>
        </mj-group>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="14px 20px 16px 20px">
        <mj-column>
          <mj-button mj-class="btn-primary" href="{{chat_cta_url}}">Read &amp; reply →</mj-button>
        </mj-column>
      </mj-section>
    </mj-wrapper>`
  },
  {
    id: "summary",
    name: "Summary / Snapshot",
    icon: "✨",
    category: "Data",
    desc: "Compact overview with metrics",
    mjml: `    <mj-section background-color="%%TINT_BLUE%%" padding="16px 20px">
      <mj-column>
        <mj-text mj-class="t-h2">✨ Snapshot</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">A quick overview in a compact layout.</mj-text>
      </mj-column>
    </mj-section>
    <mj-wrapper background-color="%%SURFACE%%" border="1px solid %%BORDER%%" padding="0">
      <mj-section background-color="%%SURFACE%%" padding="14px 20px">
        <mj-group>
          <mj-column width="60%" padding="0">
            <mj-text mj-class="t-label">HIGHLIGHTS</mj-text>
            <mj-text font-weight="700">{{left_title}}</mj-text>
            <mj-text mj-class="t-muted">{{left_line_1}}</mj-text>
          </mj-column>
          <mj-column width="40%" padding="0">
            <mj-text mj-class="t-label" align="right">DETAILS</mj-text>
            <mj-text font-weight="700" align="right">{{right_title}}</mj-text>
            <mj-text mj-class="t-muted" align="right">{{right_line_1}}</mj-text>
          </mj-column>
        </mj-group>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="0 20px 16px 20px">
        <mj-column>
          <mj-button mj-class="btn-primary" href="{{cta_url}}">View more →</mj-button>
        </mj-column>
      </mj-section>
    </mj-wrapper>`
  },
  {
    id: "trust-list",
    name: "Trust List",
    icon: "✅",
    category: "Marketing",
    desc: "Trust-building checkmark list",
    mjml: `    <mj-section background-color="%%TINT_GREEN%%" padding="16px 20px">
      <mj-column>
        <mj-text mj-class="t-h2">✅ Why people keep using 10times</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">Small signals that build trust over time.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="14px 20px 18px 20px">
      <mj-column>
        <mj-text>✓ Save events to your watchlist</mj-text>
        <mj-spacer height="6px" />
        <mj-text>✓ Track who's attending</mj-text>
        <mj-spacer height="6px" />
        <mj-text>✓ Compare editions and similar events</mj-text>
        <mj-spacer height="12px" />
        <mj-button mj-class="btn-link" href="{{learn_more_url}}">How it works →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "divider-spacer",
    name: "Divider / Spacer",
    icon: "➖",
    category: "Layout",
    desc: "Visual separator between sections",
    mjml: `    <mj-section background-color="%%BG%%" padding="8px 20px">
      <mj-column>
        <mj-divider border-width="1px" border-color="%%BORDER%%" padding="12px 0" />
      </mj-column>
    </mj-section>`
  },
  {
    id: "rating-stars",
    name: "Rating / Review Stars",
    icon: "⭐",
    category: "Data",
    desc: "Star rating with review count",
    mjml: `    <mj-section background-color="%%TINT_ORANGE%%" padding="20px 24px">
      <mj-column>
        <mj-text mj-class="t-h2">⭐ Event Ratings</mj-text>
        <mj-spacer height="8px" />
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="20px 24px">
      <mj-column width="50%">
        <mj-text font-size="36px" line-height="40px" font-weight="700" align="center" color="%%BRAND%%">{{avg_rating}}</mj-text>
        <mj-text align="center" font-size="22px" padding="4px 0">⭐⭐⭐⭐☆</mj-text>
        <mj-text mj-class="t-muted" align="center">{{review_count}} reviews</mj-text>
      </mj-column>
      <mj-column width="50%">
        <mj-text mj-class="t-muted">5★ — {{pct_5}}%</mj-text>
        <mj-text mj-class="t-muted">4★ — {{pct_4}}%</mj-text>
        <mj-text mj-class="t-muted">3★ — {{pct_3}}%</mj-text>
        <mj-text mj-class="t-muted">2★ — {{pct_2}}%</mj-text>
        <mj-text mj-class="t-muted">1★ — {{pct_1}}%</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="0 24px 20px">
      <mj-column>
        <mj-button mj-class="btn-primary" href="{{write_review_url}}">Write a review →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "testimonial",
    name: "Testimonial / Quote",
    icon: "💬",
    category: "Marketing",
    desc: "Customer quote with attribution",
    mjml: `    <mj-section background-color="%%TINT_VIOLET%%" padding="24px 24px">
      <mj-column>
        <mj-text font-size="18px" line-height="28px" font-style="italic" color="%%TEXT%%">
          "{{testimonial_text}}"
        </mj-text>
        <mj-spacer height="12px" />
        <mj-text font-weight="700" font-size="14px">— {{testimonial_author}}</mj-text>
        <mj-text mj-class="t-muted">{{testimonial_role}}</mj-text>
      </mj-column>
    </mj-section>`
  },
  {
    id: "faq-section",
    name: "FAQ Section",
    icon: "❓",
    category: "Data",
    desc: "Frequently asked questions list",
    mjml: `    <mj-section background-color="%%TINT_BLUE%%" padding="20px 24px">
      <mj-column>
        <mj-text mj-class="t-h2">❓ Frequently Asked Questions</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="20px 24px">
      <mj-column>
        <mj-text font-weight="700">{{faq_q1}}</mj-text>
        <mj-spacer height="4px" />
        <mj-text mj-class="t-muted">{{faq_a1}}</mj-text>
        <mj-spacer height="16px" />
        <mj-divider />
        <mj-spacer height="16px" />
        <mj-text font-weight="700">{{faq_q2}}</mj-text>
        <mj-spacer height="4px" />
        <mj-text mj-class="t-muted">{{faq_a2}}</mj-text>
        <mj-spacer height="16px" />
        <mj-divider />
        <mj-spacer height="16px" />
        <mj-text font-weight="700">{{faq_q3}}</mj-text>
        <mj-spacer height="4px" />
        <mj-text mj-class="t-muted">{{faq_a3}}</mj-text>
      </mj-column>
    </mj-section>`
  },
  {
    id: "newsletter-signup",
    name: "Newsletter Signup",
    icon: "📰",
    category: "Marketing",
    desc: "Newsletter subscription CTA",
    mjml: `    <mj-section background-color="%%BRAND%%" padding="28px 24px">
      <mj-column>
        <mj-text mj-class="t-h1" color="#ffffff" align="center">📰 Stay in the Loop</mj-text>
        <mj-spacer height="8px" />
        <mj-text color="rgba(255,255,255,0.8)" align="center" font-size="14px">Get the best events and industry insights delivered weekly.</mj-text>
        <mj-spacer height="16px" />
        <mj-button mj-class="btn-primary" href="{{subscribe_url}}" align="center">Subscribe Now →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "referral-cta",
    name: "Referral CTA",
    icon: "🎁",
    category: "Marketing",
    desc: "Invite-a-friend referral block",
    mjml: `    <mj-section background-color="%%TINT_GREEN%%" padding="24px 24px">
      <mj-column width="65%">
        <mj-text mj-class="t-h2">🎁 Know someone who'd love this?</mj-text>
        <mj-spacer height="6px" />
        <mj-text mj-class="t-muted">Share this event and earn perks for every friend who registers.</mj-text>
        <mj-spacer height="12px" />
        <mj-button mj-class="btn-primary" href="{{referral_url}}">Invite a friend →</mj-button>
      </mj-column>
      <mj-column width="35%">
        <mj-text font-size="48px" align="center" padding="10px 0">🎁</mj-text>
      </mj-column>
    </mj-section>`
  },
  {
    id: "plain-text",
    name: "Plain Text Block",
    icon: "📝",
    category: "Layout",
    desc: "Simple rich text content area",
    mjml: `    <mj-section background-color="%%SURFACE%%" padding="20px 24px">
      <mj-column>
        <mj-text>{{plain_text_content}}</mj-text>
      </mj-column>
    </mj-section>`
  },
  {
    id: "rate-event",
    name: "Rate This Event",
    icon: "🌟",
    category: "Data",
    desc: "Interactive 5-star rating selection",
    mjml: `    <mj-section background-color="%%TINT_ORANGE%%" padding="20px 24px">
      <mj-column>
        <mj-text mj-class="t-h2">🌟 How was the event?</mj-text>
        <mj-spacer height="4px" />
        <mj-text mj-class="t-muted">Tap a star to rate your experience.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="24px 24px 4px">
      <mj-column width="20%" padding="0 4px">
        <mj-button background-color="transparent" color="#f59e0b" font-size="32px" inner-padding="8px 0" href="{{rate_1_url}}" align="center" border="none" border-radius="8px" css-class="star-btn">★</mj-button>
        <mj-text align="center" font-size="11px" font-weight="700" color="%%MUTED%%" padding="0 0 4px">1</mj-text>
      </mj-column>
      <mj-column width="20%" padding="0 4px">
        <mj-button background-color="transparent" color="#f59e0b" font-size="32px" inner-padding="8px 0" href="{{rate_2_url}}" align="center" border="none" border-radius="8px" css-class="star-btn">★</mj-button>
        <mj-text align="center" font-size="11px" font-weight="700" color="%%MUTED%%" padding="0 0 4px">2</mj-text>
      </mj-column>
      <mj-column width="20%" padding="0 4px">
        <mj-button background-color="transparent" color="#f59e0b" font-size="32px" inner-padding="8px 0" href="{{rate_3_url}}" align="center" border="none" border-radius="8px" css-class="star-btn">★</mj-button>
        <mj-text align="center" font-size="11px" font-weight="700" color="%%MUTED%%" padding="0 0 4px">3</mj-text>
      </mj-column>
      <mj-column width="20%" padding="0 4px">
        <mj-button background-color="transparent" color="#f59e0b" font-size="32px" inner-padding="8px 0" href="{{rate_4_url}}" align="center" border="none" border-radius="8px" css-class="star-btn">★</mj-button>
        <mj-text align="center" font-size="11px" font-weight="700" color="%%MUTED%%" padding="0 0 4px">4</mj-text>
      </mj-column>
      <mj-column width="20%" padding="0 4px">
        <mj-button background-color="transparent" color="#f59e0b" font-size="32px" inner-padding="8px 0" href="{{rate_5_url}}" align="center" border="none" border-radius="8px" css-class="star-btn">★</mj-button>
        <mj-text align="center" font-size="11px" font-weight="700" color="%%MUTED%%" padding="0 0 4px">5</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="0 24px 20px">
      <mj-column>
        <mj-text mj-class="t-muted" align="center">Your feedback helps others discover great events.</mj-text>
      </mj-column>
    </mj-section>`
  },
  {
    id: "attendance-row",
    name: "Attendance",
    icon: "🙋",
    category: "Data",
    desc: "Did you attend? Yes/No buttons",
    mjml: `    <mj-section background-color="%%TINT_BLUE%%" padding="20px 24px">
      <mj-column>
        <mj-text mj-class="t-h2">🙋 Did you attend {{attendance_event_name}}?</mj-text>
        <mj-spacer height="4px" />
        <mj-text mj-class="t-muted">Help us keep our records accurate.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="16px 24px 20px">
      <mj-column width="48%" padding="0">
        <mj-button mj-class="btn-primary" href="{{attended_yes_url}}" align="center" background-color="#16a34a" border-radius="8px">✅ Yes, I attended</mj-button>
      </mj-column>
      <mj-column width="4%"><mj-spacer height="1px" /></mj-column>
      <mj-column width="48%" padding="0">
        <mj-button mj-class="btn-secondary" href="{{attended_no_url}}" align="center" border-radius="8px">❌ No, I didn't</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "banner-full",
    name: "Banner (Full Width)",
    icon: "🖼️",
    category: "Marketing",
    desc: "Tall banner image with overlay text",
    mjml: `    <mj-section background-color="%%BRAND%%" background-url="https://placehold.co/600x260/0b1f5d/ffffff?text=Banner+Image" background-size="cover" background-repeat="no-repeat" padding="0">
      <mj-column padding="60px 24px">
        <mj-text font-size="26px" line-height="32px" font-weight="900" color="#ffffff" align="center">{{banner_headline}}</mj-text>
        <mj-spacer height="8px" />
        <mj-text color="rgba(255,255,255,0.8)" align="center">{{banner_subtext}}</mj-text>
        <mj-spacer height="16px" />
        <mj-button mj-class="btn-primary" href="{{banner_cta_url}}" align="center">{{banner_cta_text}}</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "banner-short",
    name: "Banner (Short)",
    icon: "📢",
    category: "Marketing",
    desc: "Compact banner with side CTA",
    mjml: `    <mj-section background-color="%%BRAND%%" padding="16px 24px">
      <mj-column width="65%">
        <mj-text font-size="16px" font-weight="700" color="#ffffff">{{short_banner_text}}</mj-text>
        <mj-spacer height="4px" />
        <mj-text color="rgba(255,255,255,0.7)" font-size="13px">{{short_banner_subtext}}</mj-text>
      </mj-column>
      <mj-column width="35%">
        <mj-button mj-class="btn-primary" href="{{short_banner_url}}" align="right">{{short_banner_cta}}</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "banner-2up",
    name: "Banners (2-up)",
    icon: "🖼️🖼️",
    category: "Marketing",
    desc: "Two side-by-side banners, different heights",
    mjml: `    <mj-section background-color="%%BG%%" padding="8px 18px 12px">
      <mj-column width="48%" padding="0" background-color="%%BRAND%%" border-radius="10px">
        <mj-image src="https://placehold.co/280x160/0b1f5d/ffffff?text=Banner+1" alt="Banner" width="280px" border-radius="10px 10px 0 0" padding="0" />
        <mj-text font-weight="700" color="#ffffff" padding="12px 16px 4px" font-size="15px">{{banner2_1_title}}</mj-text>
        <mj-text color="rgba(255,255,255,0.7)" font-size="12px" padding="0 16px 0">{{banner2_1_sub}}</mj-text>
        <mj-button mj-class="btn-primary" href="{{banner2_1_url}}" padding="10px 16px 16px" font-size="13px" inner-padding="8px 18px">Learn more →</mj-button>
      </mj-column>
      <mj-column width="4%"><mj-spacer height="1px" /></mj-column>
      <mj-column width="48%" padding="0" background-color="%%TINT_VIOLET%%" border-radius="10px">
        <mj-text font-weight="900" color="%%BRAND%%" padding="20px 16px 4px" font-size="18px">{{banner2_2_title}}</mj-text>
        <mj-text mj-class="t-muted" padding="0 16px 0">{{banner2_2_sub}}</mj-text>
        <mj-spacer height="8px" />
        <mj-button mj-class="btn-secondary" href="{{banner2_2_url}}" padding="0 16px 20px" font-size="13px" inner-padding="8px 18px">Explore →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "saas-metrics",
    name: "SaaS Metrics Dashboard",
    icon: "📊",
    category: "Data",
    desc: "MRR, Churn, ARR, LTV metric tiles",
    mjml: `    <mj-section background-color="%%TINT_BLUE%%" padding="18px 24px">
      <mj-column>
        <mj-text mj-class="t-h2">📊 Monthly Report — {{report_month}}</mj-text>
        <mj-spacer height="4px" />
        <mj-text mj-class="t-muted">Key metrics at a glance.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="16px 14px 4px">
      <mj-column width="50%" padding="6px">
        <mj-text mj-class="t-label" color="%%LINK%%" padding="12px 14px 0">MRR</mj-text>
        <mj-text font-size="28px" font-weight="900" color="%%BRAND%%" padding="4px 14px 0">{{mrr_value}}</mj-text>
        <mj-text mj-class="t-muted" padding="2px 14px 12px" color="#16a34a">↑ {{mrr_change}}% vs last month</mj-text>
      </mj-column>
      <mj-column width="50%" padding="6px">
        <mj-text mj-class="t-label" color="%%LINK%%" padding="12px 14px 0">CHURN RATE</mj-text>
        <mj-text font-size="28px" font-weight="900" color="%%BRAND%%" padding="4px 14px 0">{{churn_value}}%</mj-text>
        <mj-text mj-class="t-muted" padding="2px 14px 12px" color="#dc2626">↓ {{churn_change}}% vs last month</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="0 14px 4px">
      <mj-column width="50%" padding="6px">
        <mj-text mj-class="t-label" color="%%LINK%%" padding="12px 14px 0">ARR</mj-text>
        <mj-text font-size="28px" font-weight="900" color="%%BRAND%%" padding="4px 14px 0">{{arr_value}}</mj-text>
        <mj-text mj-class="t-muted" padding="2px 14px 12px">Annual recurring revenue</mj-text>
      </mj-column>
      <mj-column width="50%" padding="6px">
        <mj-text mj-class="t-label" color="%%LINK%%" padding="12px 14px 0">AVG LTV</mj-text>
        <mj-text font-size="28px" font-weight="900" color="%%BRAND%%" padding="4px 14px 0">{{ltv_value}}</mj-text>
        <mj-text mj-class="t-muted" padding="2px 14px 12px">Lifetime value per user</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="%%SURFACE%%" padding="0 24px 18px">
      <mj-column>
        <mj-button mj-class="btn-primary" href="{{dashboard_url}}">View full dashboard →</mj-button>
      </mj-column>
    </mj-section>`
  },
  {
    id: "saas-funnel",
    name: "SaaS Funnel",
    icon: "📈",
    category: "Data",
    desc: "Trial to paid conversion funnel row",
    mjml: `    <mj-wrapper background-color="%%SURFACE%%" border="1px solid %%BORDER%%" padding="0">
      <mj-section background-color="%%SURFACE%%" padding="16px 20px 0">
        <mj-column><mj-text mj-class="t-label">CONVERSION FUNNEL</mj-text></mj-column>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="10px 20px 0">
        <mj-group>
          <mj-column width="35%" padding="0"><mj-text font-weight="700">Visitors</mj-text></mj-column>
          <mj-column width="30%" padding="0"><mj-text font-size="20px" font-weight="900" color="%%BRAND%%">{{funnel_visitors}}</mj-text></mj-column>
          <mj-column width="35%" padding="0"><mj-text mj-class="t-muted" align="right">100%</mj-text></mj-column>
        </mj-group>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="6px 20px 0"><mj-column><mj-divider border-width="1px" border-color="%%BORDER%%" padding="0" /></mj-column></mj-section>
      <mj-section background-color="%%SURFACE%%" padding="10px 20px 0">
        <mj-group>
          <mj-column width="35%" padding="0"><mj-text font-weight="700">Trial signups</mj-text></mj-column>
          <mj-column width="30%" padding="0"><mj-text font-size="20px" font-weight="900" color="%%BRAND%%">{{funnel_trials}}</mj-text></mj-column>
          <mj-column width="35%" padding="0"><mj-text mj-class="t-muted" align="right">{{funnel_trial_pct}}%</mj-text></mj-column>
        </mj-group>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="6px 20px 0"><mj-column><mj-divider border-width="1px" border-color="%%BORDER%%" padding="0" /></mj-column></mj-section>
      <mj-section background-color="%%SURFACE%%" padding="10px 20px 0">
        <mj-group>
          <mj-column width="35%" padding="0"><mj-text font-weight="700">Paid conversions</mj-text></mj-column>
          <mj-column width="30%" padding="0"><mj-text font-size="20px" font-weight="900" color="#16a34a">{{funnel_paid}}</mj-text></mj-column>
          <mj-column width="35%" padding="0"><mj-text mj-class="t-muted" align="right">{{funnel_paid_pct}}%</mj-text></mj-column>
        </mj-group>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="14px 20px 16px">
        <mj-column>
          <mj-button mj-class="btn-primary" href="{{funnel_url}}">View funnel analytics →</mj-button>
        </mj-column>
      </mj-section>
    </mj-wrapper>`
  },
  {
    id: "saas-usage-alert",
    name: "SaaS Usage Alert",
    icon: "⚡",
    category: "Data",
    desc: "Approaching plan limit warning",
    mjml: `    <mj-section background-color="%%TINT_ORANGE%%" padding="20px 24px">
      <mj-column>
        <mj-text mj-class="t-h2">⚡ Usage Alert</mj-text>
        <mj-spacer height="4px" />
        <mj-text mj-class="t-muted">You're approaching your plan limits.</mj-text>
      </mj-column>
    </mj-section>
    <mj-wrapper background-color="%%SURFACE%%" border="1px solid %%BORDER%%" padding="0">
      <mj-section background-color="%%SURFACE%%" padding="14px 20px 0">
        <mj-group>
          <mj-column width="40%" padding="0"><mj-text font-weight="700">API Calls</mj-text></mj-column>
          <mj-column width="30%" padding="0"><mj-text font-weight="900" color="#dc2626">{{api_used}} / {{api_limit}}</mj-text></mj-column>
          <mj-column width="30%" padding="0"><mj-text mj-class="t-muted" align="right">{{api_pct}}% used</mj-text></mj-column>
        </mj-group>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="6px 20px 0"><mj-column><mj-divider border-width="1px" border-color="%%BORDER%%" padding="0" /></mj-column></mj-section>
      <mj-section background-color="%%SURFACE%%" padding="10px 20px 0">
        <mj-group>
          <mj-column width="40%" padding="0"><mj-text font-weight="700">Storage</mj-text></mj-column>
          <mj-column width="30%" padding="0"><mj-text font-weight="900" color="%%BRAND%%">{{storage_used}}</mj-text></mj-column>
          <mj-column width="30%" padding="0"><mj-text mj-class="t-muted" align="right">{{storage_pct}}% used</mj-text></mj-column>
        </mj-group>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="6px 20px 0"><mj-column><mj-divider border-width="1px" border-color="%%BORDER%%" padding="0" /></mj-column></mj-section>
      <mj-section background-color="%%SURFACE%%" padding="10px 20px 0">
        <mj-group>
          <mj-column width="40%" padding="0"><mj-text font-weight="700">Team seats</mj-text></mj-column>
          <mj-column width="30%" padding="0"><mj-text font-weight="900" color="%%BRAND%%">{{seats_used}} / {{seats_limit}}</mj-text></mj-column>
          <mj-column width="30%" padding="0"><mj-text mj-class="t-muted" align="right">{{seats_pct}}% used</mj-text></mj-column>
        </mj-group>
      </mj-section>
      <mj-section background-color="%%SURFACE%%" padding="14px 20px 16px">
        <mj-column>
          <mj-button mj-class="btn-primary" href="{{upgrade_url}}">Upgrade plan →</mj-button>
        </mj-column>
      </mj-section>
    </mj-wrapper>`
  },
  {
    id: "footer",
    name: "Footer",
    icon: "📎",
    category: "Footer",
    desc: "Social links + legal + unsubscribe",
    mjml: `    <mj-wrapper background-color="%%BRAND%%" padding="0">
      <mj-section background-color="%%BRAND%%" padding="24px 24px">
        <mj-column>
          <mj-social mode="horizontal" icon-size="28px" padding="0" align="center">
            <mj-social-element name="facebook" href="{{facebook_url}}" />
            <mj-social-element name="twitter" href="{{twitter_url}}" />
            <mj-social-element name="linkedin" href="{{linkedin_url}}" />
            <mj-social-element name="instagram" href="{{instagram_url}}" />
          </mj-social>
          <mj-spacer height="16px" />
          <mj-text mj-class="t-label" align="center" color="rgba(255,255,255,0.7)" padding="0">
            © {{year}} 10times. All rights reserved.
          </mj-text>
          <mj-spacer height="10px" />
          <mj-text align="center" font-size="12px" line-height="18px" padding="0" color="rgba(255,255,255,0.7)">
            <a href="{{unsubscribe_url}}" style="color:rgba(255,255,255,0.9); text-decoration:underline;">Unsubscribe</a>
            &nbsp;&bull;&nbsp;
            <a href="{{preferences_url}}" style="color:rgba(255,255,255,0.9); text-decoration:underline;">Manage preferences</a>
          </mj-text>
          <mj-spacer height="10px" />
          <mj-text align="center" font-size="11px" line-height="16px" color="rgba(255,255,255,0.5)" padding="0">
            You're receiving this because you have a 10times account and opted into updates.
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-wrapper>`
  }
];

// ================================================================
// Color Themes
// ================================================================
const DEFAULT_TOKENS = {
  BG: "#f5f7fb",
  SURFACE: "#ffffff",
  BORDER: "#e5e7eb",
  TEXT: "#111827",
  MUTED: "#6b7280",
  LINK: "#2563eb",
  BRAND: "#0b1f5d",
  CTA: "#E03400",
  CTA_TEXT: "#ffffff",
  TINT_BLUE: "#e6f0ff",
  TINT_ORANGE: "#ffe8d6",
  TINT_GREEN: "#e8f8ee",
  TINT_VIOLET: "#efe9ff",
  TINT_RED: "#ffe5e5"
};

const THEMES = [
  { name: "10times Default", tokens: { ...DEFAULT_TOKENS } },
  { name: "Ocean Blue", tokens: { ...DEFAULT_TOKENS, BRAND: "#0f4c81", CTA: "#0ea5e9", TINT_BLUE: "#e0f2fe", TINT_VIOLET: "#e0e7ff" } },
  { name: "Emerald", tokens: { ...DEFAULT_TOKENS, BRAND: "#065f46", CTA: "#059669", TINT_GREEN: "#d1fae5", TINT_BLUE: "#ecfdf5" } },
  { name: "Sunset", tokens: { ...DEFAULT_TOKENS, BRAND: "#7c2d12", CTA: "#ea580c", TINT_ORANGE: "#fff7ed", TINT_RED: "#fee2e2" } },
  { name: "Royal Purple", tokens: { ...DEFAULT_TOKENS, BRAND: "#4c1d95", CTA: "#7c3aed", TINT_VIOLET: "#ede9fe", TINT_BLUE: "#f0e4ff" } },
  { name: "Slate Modern", tokens: { ...DEFAULT_TOKENS, BRAND: "#1e293b", CTA: "#3b82f6", LINK: "#3b82f6", TEXT: "#0f172a", MUTED: "#64748b" } },
  { name: "Rose Gold", tokens: { ...DEFAULT_TOKENS, BRAND: "#881337", CTA: "#e11d48", TINT_RED: "#ffe4e6", TINT_ORANGE: "#fff1f2" } },
  { name: "Forest", tokens: { ...DEFAULT_TOKENS, BRAND: "#14532d", CTA: "#16a34a", TINT_GREEN: "#dcfce7", LINK: "#15803d" } }
];
