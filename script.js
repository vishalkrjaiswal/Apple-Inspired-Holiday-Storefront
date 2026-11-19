/**
 * Apple Holiday Campaign Webpage Interactivity
 * Handles Navigation, Mobile Drawer, Search Overlay, Bag Flyout, 
 * Pause/Play Banner Toggle, and Holiday Gift Modal.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- Elements ---
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const searchBtn = document.getElementById('search-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const bagBtn = document.getElementById('bag-btn');
  const bagFlyout = document.getElementById('bag-flyout');
  const btnShopGifts = document.getElementById('btnShopGifts');
  const giftModalBackdrop = document.getElementById('giftModalBackdrop');
  const giftModalClose = document.getElementById('giftModalClose');

  // --- Desktop mega-menu ---
  const globalnavHeader = document.querySelector('.globalnav-header');
  const desktopNav = document.getElementById('globalnav-list');
  const megaMenu = document.getElementById('globalnav-megamenu');
  const megaMenuContent = document.getElementById('globalnav-megamenu-content');
  const navBackdrop = document.getElementById('globalnav-backdrop');
  const menuContent = {
    Store: {
      title: 'Find the perfect gift.',
      columns: [
        { heading: 'Shop', links: [['Shop gifts', '#promo-grid'], ['iPhone', '#iphone-duo'], ['Apple Watch', '#watch-airpods-grid'], ['Accessories', '#upgrade-card-grid']] },
        { heading: 'Quick Links', links: [['Find a store', '#apple-footer'], ['Order status', '#apple-footer'], ['Ways to shop', '#apple-footer']] }
      ]
    },
    Mac: {
      title: 'Explore the Mac lineup.',
      columns: [
        { heading: 'Explore Mac', links: [['MacBook Air', '#promo-grid'], ['MacBook Pro', '#promo-grid'], ['iMac', '#promo-grid'], ['Compare Mac', '#promo-grid']] },
        { heading: 'More from Mac', links: [['Mac accessories', '#upgrade-card-grid'], ['macOS', '#promo-grid'], ['Shop Mac', '#promo-grid']] }
      ]
    },
    'iPad': {
      title: 'Explore the iPad lineup.',
      columns: [
        { heading: 'Explore iPad', links: [['iPad Pro', '#promo-grid'], ['iPad Air', '#promo-grid'], ['iPad', '#promo-grid'], ['Compare iPad', '#promo-grid']] },
        { heading: 'More from iPad', links: [['iPad accessories', '#upgrade-card-grid'], ['iPadOS', '#promo-grid'], ['Shop iPad', '#promo-grid']] }
      ]
    },
    iPhone: {
      title: 'Meet the latest iPhone.',
      columns: [
        { heading: 'Explore iPhone', links: [['iPhone 18 Pro', '#iphone-18-pro'], ['iPhone Duo', '#iphone-duo'], ['Compare iPhone', '#iphone-duo'], ['Switch to iPhone', '#iphone-duo']] },
        { heading: 'More from iPhone', links: [['iPhone accessories', '#upgrade-card-grid'], ['iOS 26', '#iphone-duo'], ['Shop iPhone', '#iphone-duo']] }
      ]
    },
    Watch: {
      title: 'A healthy leap ahead.',
      columns: [
        { heading: 'Explore Watch', links: [['Apple Watch Series 12', '#watch-airpods-grid'], ['Apple Watch Ultra', '#watch-airpods-grid'], ['Apple Watch SE', '#watch-airpods-grid'], ['Compare Watch', '#watch-airpods-grid']] },
        { heading: 'More from Watch', links: [['Apple Fitness+', '#entertainment-section'], ['Watch accessories', '#upgrade-card-grid'], ['Shop Watch', '#watch-airpods-grid']] }
      ]
    },
    Vision: {
      title: 'A new dimension of entertainment.',
      columns: [
        { heading: 'Explore Vision', links: [['Explore Apple Vision Pro', '#promo-grid'], ['Guided Tour', '#promo-grid'], ['Tech specs', '#promo-grid']] },
        { heading: 'More from Vision', links: [['visionOS', '#promo-grid'], ['Accessories', '#upgrade-card-grid'], ['Shop Vision Pro', '#promo-grid']] }
      ]
    },
    AirPods: {
      title: 'Sound that moves you.',
      columns: [
        { heading: 'Explore AirPods', links: [['AirPods Pro 3', '#watch-airpods-grid'], ['AirPods 4', '#watch-airpods-grid'], ['AirPods Max', '#watch-airpods-grid'], ['Compare AirPods', '#watch-airpods-grid']] },
        { heading: 'More from AirPods', links: [['Apple Music', '#entertainment-section'], ['AirPods accessories', '#upgrade-card-grid'], ['Shop AirPods', '#watch-airpods-grid']] }
      ]
    },
    'TV & Home': {
      title: 'Bring the best of Apple home.',
      columns: [
        { heading: 'Explore TV & Home', links: [['Apple TV 4K', '#promo-grid'], ['HomePod', '#promo-grid'], ['Home app', '#promo-grid']] },
        { heading: 'More from TV & Home', links: [['Apple TV+', '#entertainment-section'], ['Apple Home accessories', '#upgrade-card-grid'], ['Shop TV & Home', '#promo-grid']] }
      ]
    },
    Entertainment: {
      title: 'Endless entertainment.',
      columns: [
        { heading: 'Explore Entertainment', links: [['Apple TV+', '#entertainment-section'], ['Apple Music', '#entertainment-section'], ['Apple Arcade', '#entertainment-section'], ['Apple Fitness+', '#entertainment-section']] },
        { heading: 'More from Entertainment', links: [['Apple Podcasts', '#entertainment-section'], ['Apple Books', '#entertainment-section'], ['Shop services', '#entertainment-section']] }
      ]
    },
    Accessories: {
      title: 'The perfect match for your devices.',
      columns: [
        { heading: 'Shop Accessories', links: [['iPhone cases & protection', '#upgrade-card-grid'], ['Chargers & cables', '#upgrade-card-grid'], ['Audio', '#watch-airpods-grid'], ['All accessories', '#upgrade-card-grid']] },
        { heading: 'Explore', links: [['Made by Apple', '#upgrade-card-grid'], ['Apple accessories', '#upgrade-card-grid'], ['Shop accessories', '#upgrade-card-grid']] }
      ]
    },
    Support: {
      title: 'We’re here to help.',
      columns: [
        { heading: 'Get Support', links: [['iPhone Support', '#apple-footer'], ['Mac Support', '#apple-footer'], ['Watch Support', '#apple-footer'], ['Explore Support', '#apple-footer']] },
        { heading: 'Helpful Links', links: [['AppleCare+', '#apple-footer'], ['Apple Account', '#apple-footer'], ['Contact Apple', '#apple-footer']] }
      ]
    }
  };
  let menuCloseTimer;

  const closeMegaMenu = () => {
    if (!megaMenu || !globalnavHeader || !desktopNav) return;
    globalnavHeader.classList.remove('menu-open');
    megaMenu.classList.remove('open');
    megaMenu.setAttribute('aria-hidden', 'true');
    desktopNav.querySelectorAll('.globalnav-link').forEach(link => {
      link.setAttribute('aria-expanded', 'false');
    });
  };

  const openMegaMenu = (link) => {
    if (!megaMenu || !megaMenuContent || !globalnavHeader || !desktopNav) return;
    const data = menuContent[link.textContent.trim()];
    if (!data) return;

    window.clearTimeout(menuCloseTimer);
    if (searchOverlay) {
      searchOverlay.classList.remove('open');
      searchOverlay.setAttribute('aria-hidden', 'true');
    }
    if (bagFlyout) {
      bagFlyout.classList.remove('open');
      bagFlyout.setAttribute('aria-hidden', 'true');
    }
    megaMenuContent.replaceChildren();

    const intro = document.createElement('div');
    intro.className = 'globalnav-menu-intro';
    const eyebrow = document.createElement('span');
    eyebrow.className = 'globalnav-menu-eyebrow';
    eyebrow.textContent = `Explore ${link.textContent.trim()}`;
    const title = document.createElement('h2');
    title.textContent = data.title;
    intro.append(eyebrow, title);
    megaMenuContent.append(intro);

    data.columns.forEach(column => {
      const section = document.createElement('section');
      section.className = 'globalnav-menu-column';
      const heading = document.createElement('h3');
      heading.textContent = column.heading;
      const list = document.createElement('ul');
      list.className = 'globalnav-menu-links';

      column.links.forEach(([label, href]) => {
        const item = document.createElement('li');
        const itemLink = document.createElement('a');
        itemLink.href = href;
        itemLink.textContent = label;
        itemLink.addEventListener('click', closeMegaMenu);
        item.append(itemLink);
        list.append(item);
      });

      section.append(heading, list);
      megaMenuContent.append(section);
    });

    desktopNav.querySelectorAll('.globalnav-link').forEach(navLink => {
      navLink.setAttribute('aria-expanded', String(navLink === link));
    });
    globalnavHeader.classList.add('menu-open');
    megaMenu.classList.add('open');
    megaMenu.setAttribute('aria-hidden', 'false');
  };

  if (desktopNav && megaMenu && globalnavHeader) {
    desktopNav.querySelectorAll('.globalnav-link').forEach(link => {
      link.addEventListener('pointerenter', () => {
        if (window.matchMedia('(min-width: 834px)').matches) openMegaMenu(link);
      });
      link.addEventListener('focus', () => {
        if (window.matchMedia('(min-width: 834px)').matches) openMegaMenu(link);
      });
      link.addEventListener('click', event => {
        if (!window.matchMedia('(min-width: 834px)').matches) return;
        event.preventDefault();
        openMegaMenu(link);
      });
    });

    globalnavHeader.addEventListener('pointerleave', () => {
      menuCloseTimer = window.setTimeout(closeMegaMenu, 180);
    });
    megaMenu.addEventListener('pointerenter', () => window.clearTimeout(menuCloseTimer));
    if (navBackdrop) navBackdrop.addEventListener('click', closeMegaMenu);

    document.addEventListener('click', event => {
      if (!globalnavHeader.contains(event.target)) closeMegaMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && megaMenu.classList.contains('open')) {
        closeMegaMenu();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 1. Mobile Menu Toggle
  // --------------------------------------------------------------------------
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMegaMenu();
      const isOpen = menuToggle.classList.toggle('active');
      mobileDrawer.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      mobileDrawer.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';

      // Close other dropdowns
      if (searchOverlay) searchOverlay.classList.remove('open');
      if (bagFlyout) bagFlyout.classList.remove('open');
    });

    // Close menu when clicking on mobile links
    mobileDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileDrawer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 2. Search Overlay
  // --------------------------------------------------------------------------
  if (searchBtn && searchOverlay && searchClose) {
    searchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMegaMenu();
      const isOpen = searchOverlay.classList.toggle('open');
      searchOverlay.setAttribute('aria-hidden', String(!isOpen));

      if (isOpen) {
        if (searchInput) searchInput.focus();
        if (bagFlyout) bagFlyout.classList.remove('open');
      }
    });

    searchClose.addEventListener('click', () => {
      searchOverlay.classList.remove('open');
      searchOverlay.setAttribute('aria-hidden', 'true');
    });
  }

  // --------------------------------------------------------------------------
  // 3. Bag Flyout
  // --------------------------------------------------------------------------
  if (bagBtn && bagFlyout) {
    bagBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMegaMenu();
      const isOpen = bagFlyout.classList.toggle('open');
      bagFlyout.setAttribute('aria-hidden', String(!isOpen));

      if (isOpen && searchOverlay) {
        searchOverlay.classList.remove('open');
      }
    });
  }

  // Close overlays on outside click
  document.addEventListener('click', (e) => {
    if (searchOverlay && searchOverlay.classList.contains('open')) {
      if (!searchOverlay.contains(e.target) && e.target !== searchBtn) {
        searchOverlay.classList.remove('open');
      }
    }
    if (bagFlyout && bagFlyout.classList.contains('open')) {
      if (!bagFlyout.contains(e.target) && e.target !== bagBtn) {
        bagFlyout.classList.remove('open');
      }
    }
  });

  // --------------------------------------------------------------------------
  // 4. "Shop gifts" Interactive Modal
  // --------------------------------------------------------------------------
  if (btnShopGifts && giftModalBackdrop && giftModalClose) {
    btnShopGifts.addEventListener('click', (e) => {
      e.preventDefault();
      giftModalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeModal = () => {
      giftModalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    giftModalClose.addEventListener('click', closeModal);

    giftModalBackdrop.addEventListener('click', (e) => {
      if (e.target === giftModalBackdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
        if (searchOverlay) searchOverlay.classList.remove('open');
        if (bagFlyout) bagFlyout.classList.remove('open');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. iPhone Duo Showcase Interactivity (Learn More & Buy Configurator)
  // --------------------------------------------------------------------------
  const duoLearnMoreBtn = document.getElementById('duoLearnMoreBtn');
  const duoLearnModal = document.getElementById('duoLearnModal');
  const duoLearnClose = document.getElementById('duoLearnClose');
  const duoBuyBtn = document.getElementById('duoBuyBtn');
  const duoBuyModal = document.getElementById('duoBuyModal');
  const duoBuyClose = document.getElementById('duoBuyClose');
  const duoModalBuyTrigger = document.getElementById('duoModalBuyTrigger');
  const bagBadge = document.getElementById('bagBadge');
  const btnAddBag = document.getElementById('btnAddBag');
  let cartCount = 0;

  // Learn More Modal Open/Close
  if (duoLearnMoreBtn && duoLearnModal && duoLearnClose) {
    duoLearnMoreBtn.addEventListener('click', () => {
      duoLearnModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    duoLearnClose.addEventListener('click', () => {
      duoLearnModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    duoLearnModal.addEventListener('click', (e) => {
      if (e.target === duoLearnModal) {
        duoLearnModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Buy Configurator Modal Open/Close
  const openBuyModal = () => {
    if (duoLearnModal) duoLearnModal.classList.remove('open');
    if (duoBuyModal) {
      duoBuyModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  if (duoBuyBtn) duoBuyBtn.addEventListener('click', openBuyModal);
  if (duoModalBuyTrigger) duoModalBuyTrigger.addEventListener('click', openBuyModal);

  if (duoBuyModal && duoBuyClose) {
    duoBuyClose.addEventListener('click', () => {
      duoBuyModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    duoBuyModal.addEventListener('click', (e) => {
      if (e.target === duoBuyModal) {
        duoBuyModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Color Swatch Selection
  const colorDots = document.querySelectorAll('.color-dot');
  const selectedColorLabel = document.getElementById('selectedColorLabel');
  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      colorDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const colorName = dot.getAttribute('data-color');
      if (selectedColorLabel) {
        selectedColorLabel.textContent = `Finish: ${colorName}`;
      }
    });
  });

  // Storage Selection & Dynamic Price Calculation
  const storagePills = document.querySelectorAll('.storage-pill');
  const configSummaryPrice = document.getElementById('configSummaryPrice');
  storagePills.forEach(pill => {
    pill.addEventListener('click', () => {
      storagePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const price = pill.getAttribute('data-price');
      if (configSummaryPrice) {
        configSummaryPrice.textContent = price;
      }
    });
  });

  // Add to Bag Button
  if (btnAddBag && bagBadge) {
    btnAddBag.addEventListener('click', () => {
      cartCount++;
      bagBadge.textContent = cartCount;
      bagBadge.classList.add('visible');

      // Success Feedback
      const originalText = btnAddBag.textContent;
      btnAddBag.textContent = '✓ Added to Bag';
      btnAddBag.style.backgroundColor = '#34c759';

      setTimeout(() => {
        btnAddBag.textContent = originalText;
        btnAddBag.style.backgroundColor = '';
        if (duoBuyModal) {
          duoBuyModal.classList.remove('open');
          document.body.style.overflow = '';
        }
      }, 900);
    });
  }

  // Global Escape Key Listener for Modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (duoLearnModal) duoLearnModal.classList.remove('open');
      if (duoBuyModal) duoBuyModal.classList.remove('open');
      if (typeof pro18LearnModal !== 'undefined' && pro18LearnModal) pro18LearnModal.classList.remove('open');
      if (typeof pro18BuyModal !== 'undefined' && pro18BuyModal) pro18BuyModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // --------------------------------------------------------------------------
  // 6. iPhone 18 Pro Showcase Interactivity
  // --------------------------------------------------------------------------
  const pro18LearnBtn = document.getElementById('pro18LearnBtn');
  const pro18LearnModal = document.getElementById('pro18LearnModal');
  const pro18LearnClose = document.getElementById('pro18LearnClose');
  const pro18BuyBtn = document.getElementById('pro18BuyBtn');
  const pro18BuyModal = document.getElementById('pro18BuyModal');
  const pro18BuyClose = document.getElementById('pro18BuyClose');
  const pro18ModalBuyTrigger = document.getElementById('pro18ModalBuyTrigger');
  const btnPro18AddBag = document.getElementById('btnPro18AddBag');

  // Learn More Modal Open/Close
  if (pro18LearnBtn && pro18LearnModal && pro18LearnClose) {
    pro18LearnBtn.addEventListener('click', () => {
      pro18LearnModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    pro18LearnClose.addEventListener('click', () => {
      pro18LearnModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    pro18LearnModal.addEventListener('click', (e) => {
      if (e.target === pro18LearnModal) {
        pro18LearnModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Buy Configurator Modal Open/Close
  const openProBuyModal = () => {
    if (pro18LearnModal) pro18LearnModal.classList.remove('open');
    if (pro18BuyModal) {
      pro18BuyModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  if (pro18BuyBtn) pro18BuyBtn.addEventListener('click', openProBuyModal);
  if (pro18ModalBuyTrigger) pro18ModalBuyTrigger.addEventListener('click', openProBuyModal);

  if (pro18BuyModal && pro18BuyClose) {
    pro18BuyClose.addEventListener('click', () => {
      pro18BuyModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    pro18BuyModal.addEventListener('click', (e) => {
      if (e.target === pro18BuyModal) {
        pro18BuyModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Color Swatch Selection for iPhone 18 Pro
  const colorDotsPro = document.querySelectorAll('.color-dot-pro');
  const selectedColorLabelPro = document.getElementById('selectedColorLabelPro');
  colorDotsPro.forEach(dot => {
    dot.addEventListener('click', () => {
      colorDotsPro.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const colorName = dot.getAttribute('data-color');
      if (selectedColorLabelPro) {
        selectedColorLabelPro.textContent = `Finish: ${colorName}`;
      }
    });
  });

  // Storage Selection & Dynamic Price Calculation for iPhone 18 Pro
  const storagePillsPro = document.querySelectorAll('.storage-pill-pro');
  const pro18SummaryPrice = document.getElementById('pro18SummaryPrice');
  storagePillsPro.forEach(pill => {
    pill.addEventListener('click', () => {
      storagePillsPro.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const price = pill.getAttribute('data-price');
      if (pro18SummaryPrice) {
        pro18SummaryPrice.textContent = price;
      }
    });
  });

  // Add to Bag Button for iPhone 18 Pro
  if (btnPro18AddBag && bagBadge) {
    btnPro18AddBag.addEventListener('click', () => {
      cartCount++;
      bagBadge.textContent = cartCount;
      bagBadge.classList.add('visible');

      const originalText = btnPro18AddBag.textContent;
      btnPro18AddBag.textContent = '✓ Added to Bag';
      btnPro18AddBag.style.backgroundColor = '#34c759';

      setTimeout(() => {
        btnPro18AddBag.textContent = originalText;
        btnPro18AddBag.style.backgroundColor = '';
        if (pro18BuyModal) {
          pro18BuyModal.classList.remove('open');
          document.body.style.overflow = '';
        }
      }, 900);
    });
  }

  // --------------------------------------------------------------------------
  // 7. Apple HomeView Showcase Interactivity
  // --------------------------------------------------------------------------
  const homeviewLearnBtn = document.getElementById('homeviewLearnBtn');
  const homeviewLearnModal = document.getElementById('homeviewLearnModal');
  const homeviewLearnClose = document.getElementById('homeviewLearnClose');
  const homeviewBuyBtn = document.getElementById('homeviewBuyBtn');
  const homeviewBuyModal = document.getElementById('homeviewBuyModal');
  const homeviewBuyClose = document.getElementById('homeviewBuyClose');
  const homeviewModalBuyTrigger = document.getElementById('homeviewModalBuyTrigger');
  const btnHVAddBag = document.getElementById('btnHVAddBag');

  if (homeviewLearnBtn && homeviewLearnModal && homeviewLearnClose) {
    homeviewLearnBtn.addEventListener('click', () => {
      homeviewLearnModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    homeviewLearnClose.addEventListener('click', () => {
      homeviewLearnModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    homeviewLearnModal.addEventListener('click', (e) => {
      if (e.target === homeviewLearnModal) {
        homeviewLearnModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  const openHVBuyModal = () => {
    if (homeviewLearnModal) homeviewLearnModal.classList.remove('open');
    if (homeviewBuyModal) {
      homeviewBuyModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  if (homeviewBuyBtn) homeviewBuyBtn.addEventListener('click', openHVBuyModal);
  if (homeviewModalBuyTrigger) homeviewModalBuyTrigger.addEventListener('click', openHVBuyModal);

  if (homeviewBuyModal && homeviewBuyClose) {
    homeviewBuyClose.addEventListener('click', () => {
      homeviewBuyModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    homeviewBuyModal.addEventListener('click', (e) => {
      if (e.target === homeviewBuyModal) {
        homeviewBuyModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Color Swatch Selection for HomeView
  const colorDotsHV = document.querySelectorAll('.color-dot-hv');
  const selectedColorLabelHV = document.getElementById('selectedColorLabelHV');
  colorDotsHV.forEach(dot => {
    dot.addEventListener('click', () => {
      colorDotsHV.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const colorName = dot.getAttribute('data-color');
      if (selectedColorLabelHV) selectedColorLabelHV.textContent = `Finish: ${colorName}`;
    });
  });

  // HomeView Add to Bag
  if (btnHVAddBag && bagBadge) {
    btnHVAddBag.addEventListener('click', () => {
      cartCount++;
      bagBadge.textContent = cartCount;
      bagBadge.classList.add('visible');

      const orig = btnHVAddBag.textContent;
      btnHVAddBag.textContent = '✓ Added to Bag';
      btnHVAddBag.style.backgroundColor = '#34c759';

      setTimeout(() => {
        btnHVAddBag.textContent = orig;
        btnHVAddBag.style.backgroundColor = '';
        if (homeviewBuyModal) {
          homeviewBuyModal.classList.remove('open');
          document.body.style.overflow = '';
        }
      }, 900);
    });
  }

  // --------------------------------------------------------------------------
  // 8. iPad Showcase Interactivity
  // --------------------------------------------------------------------------
  const ipadLearnBtn = document.getElementById('ipadLearnBtn');
  const ipadLearnModal = document.getElementById('ipadLearnModal');
  const ipadLearnClose = document.getElementById('ipadLearnClose');
  const ipadBuyBtn = document.getElementById('ipadBuyBtn');
  const ipadBuyModal = document.getElementById('ipadBuyModal');
  const ipadBuyClose = document.getElementById('ipadBuyClose');
  const ipadModalBuyTrigger = document.getElementById('ipadModalBuyTrigger');
  const btnIPadAddBag = document.getElementById('btnIPadAddBag');

  if (ipadLearnBtn && ipadLearnModal && ipadLearnClose) {
    ipadLearnBtn.addEventListener('click', () => {
      ipadLearnModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    ipadLearnClose.addEventListener('click', () => {
      ipadLearnModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    ipadLearnModal.addEventListener('click', (e) => {
      if (e.target === ipadLearnModal) {
        ipadLearnModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  const openIPadBuyModal = () => {
    if (ipadLearnModal) ipadLearnModal.classList.remove('open');
    if (ipadBuyModal) {
      ipadBuyModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  if (ipadBuyBtn) ipadBuyBtn.addEventListener('click', openIPadBuyModal);
  if (ipadModalBuyTrigger) ipadModalBuyTrigger.addEventListener('click', openIPadBuyModal);

  if (ipadBuyModal && ipadBuyClose) {
    ipadBuyClose.addEventListener('click', () => {
      ipadBuyModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    ipadBuyModal.addEventListener('click', (e) => {
      if (e.target === ipadBuyModal) {
        ipadBuyModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Color Swatch Selection for iPad
  const colorDotsIPad = document.querySelectorAll('.color-dot-ipad');
  const selectedColorLabelIPad = document.getElementById('selectedColorLabelIPad');
  colorDotsIPad.forEach(dot => {
    dot.addEventListener('click', () => {
      colorDotsIPad.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const colorName = dot.getAttribute('data-color');
      if (selectedColorLabelIPad) selectedColorLabelIPad.textContent = `Finish: ${colorName}`;
    });
  });

  // Storage Selection & Dynamic Price Calculation for iPad
  const storagePillsIPad = document.querySelectorAll('.storage-pill-ipad');
  const ipadSummaryPrice = document.getElementById('ipadSummaryPrice');
  storagePillsIPad.forEach(pill => {
    pill.addEventListener('click', () => {
      storagePillsIPad.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const price = pill.getAttribute('data-price');
      if (ipadSummaryPrice) ipadSummaryPrice.textContent = price;
    });
  });

  // iPad Add to Bag
  if (btnIPadAddBag && bagBadge) {
    btnIPadAddBag.addEventListener('click', () => {
      cartCount++;
      bagBadge.textContent = cartCount;
      bagBadge.classList.add('visible');

      const orig = btnIPadAddBag.textContent;
      btnIPadAddBag.textContent = '✓ Added to Bag';
      btnIPadAddBag.style.backgroundColor = '#34c759';

      setTimeout(() => {
        btnIPadAddBag.textContent = orig;
        btnIPadAddBag.style.backgroundColor = '';
        if (ipadBuyModal) {
          ipadBuyModal.classList.remove('open');
          document.body.style.overflow = '';
        }
      }, 900);
    });
  }

  // --------------------------------------------------------------------------
  // 9. Apple Watch Series 12 Interactivity
  // --------------------------------------------------------------------------
  const watchLearnBtn = document.getElementById('watchLearnBtn');
  const watchLearnModal = document.getElementById('watchLearnModal');
  const watchLearnClose = document.getElementById('watchLearnClose');
  const watchBuyBtn = document.getElementById('watchBuyBtn');
  const watchBuyModal = document.getElementById('watchBuyModal');
  const watchBuyClose = document.getElementById('watchBuyClose');
  const watchModalBuyTrigger = document.getElementById('watchModalBuyTrigger');
  const btnWatchAddBag = document.getElementById('btnWatchAddBag');

  if (watchLearnBtn && watchLearnModal && watchLearnClose) {
    watchLearnBtn.addEventListener('click', () => {
      watchLearnModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    watchLearnClose.addEventListener('click', () => {
      watchLearnModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    watchLearnModal.addEventListener('click', (e) => {
      if (e.target === watchLearnModal) {
        watchLearnModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  const openWatchBuyModal = () => {
    if (watchLearnModal) watchLearnModal.classList.remove('open');
    if (watchBuyModal) {
      watchBuyModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  if (watchBuyBtn) watchBuyBtn.addEventListener('click', openWatchBuyModal);
  if (watchModalBuyTrigger) watchModalBuyTrigger.addEventListener('click', openWatchBuyModal);

  if (watchBuyModal && watchBuyClose) {
    watchBuyClose.addEventListener('click', () => {
      watchBuyModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    watchBuyModal.addEventListener('click', (e) => {
      if (e.target === watchBuyModal) {
        watchBuyModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Color Swatch Selection for Apple Watch
  const colorDotsWatch = document.querySelectorAll('.color-dot-watch');
  const selectedColorLabelWatch = document.getElementById('selectedColorLabelWatch');
  colorDotsWatch.forEach(dot => {
    dot.addEventListener('click', () => {
      colorDotsWatch.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const colorName = dot.getAttribute('data-color');
      if (selectedColorLabelWatch) selectedColorLabelWatch.textContent = `Finish: ${colorName}`;
    });
  });

  // Connectivity Selection & Dynamic Price for Apple Watch
  const storagePillsWatch = document.querySelectorAll('.storage-pill-watch');
  const watchSummaryPrice = document.getElementById('watchSummaryPrice');
  storagePillsWatch.forEach(pill => {
    pill.addEventListener('click', () => {
      storagePillsWatch.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const price = pill.getAttribute('data-price');
      if (watchSummaryPrice) watchSummaryPrice.textContent = price;
    });
  });

  // Watch Add to Bag
  if (btnWatchAddBag && bagBadge) {
    btnWatchAddBag.addEventListener('click', () => {
      cartCount++;
      bagBadge.textContent = cartCount;
      bagBadge.classList.add('visible');

      const orig = btnWatchAddBag.textContent;
      btnWatchAddBag.textContent = '✓ Added to Bag';
      btnWatchAddBag.style.backgroundColor = '#34c759';

      setTimeout(() => {
        btnWatchAddBag.textContent = orig;
        btnWatchAddBag.style.backgroundColor = '';
        if (watchBuyModal) {
          watchBuyModal.classList.remove('open');
          document.body.style.overflow = '';
        }
      }, 900);
    });
  }

  // --------------------------------------------------------------------------
  // 10. AirPods Pro 3 Interactivity
  // --------------------------------------------------------------------------
  const airpodsLearnBtn = document.getElementById('airpodsLearnBtn');
  const airpodsLearnModal = document.getElementById('airpodsLearnModal');
  const airpodsLearnClose = document.getElementById('airpodsLearnClose');
  const airpodsBuyBtn = document.getElementById('airpodsBuyBtn');
  const airpodsBuyModal = document.getElementById('airpodsBuyModal');
  const airpodsBuyClose = document.getElementById('airpodsBuyClose');
  const airpodsModalBuyTrigger = document.getElementById('airpodsModalBuyTrigger');
  const btnAirPodsAddBag = document.getElementById('btnAirPodsAddBag');

  if (airpodsLearnBtn && airpodsLearnModal && airpodsLearnClose) {
    airpodsLearnBtn.addEventListener('click', () => {
      airpodsLearnModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    airpodsLearnClose.addEventListener('click', () => {
      airpodsLearnModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    airpodsLearnModal.addEventListener('click', (e) => {
      if (e.target === airpodsLearnModal) {
        airpodsLearnModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  const openAirPodsBuyModal = () => {
    if (airpodsLearnModal) airpodsLearnModal.classList.remove('open');
    if (airpodsBuyModal) {
      airpodsBuyModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  if (airpodsBuyBtn) airpodsBuyBtn.addEventListener('click', openAirPodsBuyModal);
  if (airpodsModalBuyTrigger) airpodsModalBuyTrigger.addEventListener('click', openAirPodsBuyModal);

  if (airpodsBuyModal && airpodsBuyClose) {
    airpodsBuyClose.addEventListener('click', () => {
      airpodsBuyModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    airpodsBuyModal.addEventListener('click', (e) => {
      if (e.target === airpodsBuyModal) {
        airpodsBuyModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // AirPods Add to Bag
  if (btnAirPodsAddBag && bagBadge) {
    btnAirPodsAddBag.addEventListener('click', () => {
      cartCount++;
      bagBadge.textContent = cartCount;
      bagBadge.classList.add('visible');

      const orig = btnAirPodsAddBag.textContent;
      btnAirPodsAddBag.textContent = '✓ Added to Bag';
      btnAirPodsAddBag.style.backgroundColor = '#34c759';

      setTimeout(() => {
        btnAirPodsAddBag.textContent = orig;
        btnAirPodsAddBag.style.backgroundColor = '';
        if (airpodsBuyModal) {
          airpodsBuyModal.classList.remove('open');
          document.body.style.overflow = '';
        }
      }, 900);
    });
  }

  // --------------------------------------------------------------------------
  // 11. Apple Upgrade Program Interactivity
  // --------------------------------------------------------------------------
  const upgradeLearnBtn = document.getElementById('upgradeLearnBtn');
  const upgradeModal = document.getElementById('upgradeModal');
  const upgradeModalClose = document.getElementById('upgradeModalClose');
  const upgradeCheckEligible = document.getElementById('upgradeCheckEligible');

  if (upgradeLearnBtn && upgradeModal && upgradeModalClose) {
    upgradeLearnBtn.addEventListener('click', () => {
      upgradeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    upgradeModalClose.addEventListener('click', () => {
      upgradeModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    upgradeModal.addEventListener('click', (e) => {
      if (e.target === upgradeModal) {
        upgradeModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  if (upgradeCheckEligible) {
    upgradeCheckEligible.addEventListener('click', () => {
      const orig = upgradeCheckEligible.textContent;
      upgradeCheckEligible.textContent = '✓ You are eligible for an annual upgrade!';
      upgradeCheckEligible.style.backgroundColor = '#34c759';
      setTimeout(() => {
        upgradeCheckEligible.textContent = orig;
        upgradeCheckEligible.style.backgroundColor = '';
        if (upgradeModal) {
          upgradeModal.classList.remove('open');
          document.body.style.overflow = '';
        }
      }, 1200);
    });
  }

  // --------------------------------------------------------------------------
  // 12. Apple Card Interactivity (Learn More & Application)
  // --------------------------------------------------------------------------
  const cardLearnBtn = document.getElementById('cardLearnBtn');
  const cardLearnModal = document.getElementById('cardLearnModal');
  const cardLearnClose = document.getElementById('cardLearnClose');
  const cardApplyBtn = document.getElementById('cardApplyBtn');
  const cardApplyModal = document.getElementById('cardApplyModal');
  const cardApplyClose = document.getElementById('cardApplyClose');
  const cardLearnApplyTrigger = document.getElementById('cardLearnApplyTrigger');
  const btnSubmitCard = document.getElementById('btnSubmitCard');
  const cardFirstName = document.getElementById('cardFirstName');
  const cardLastName = document.getElementById('cardLastName');
  const cardEngravedName = document.getElementById('cardEngravedName');

  if (cardLearnBtn && cardLearnModal && cardLearnClose) {
    cardLearnBtn.addEventListener('click', () => {
      cardLearnModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    cardLearnClose.addEventListener('click', () => {
      cardLearnModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    cardLearnModal.addEventListener('click', (e) => {
      if (e.target === cardLearnModal) {
        cardLearnModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  const openCardApplyModal = () => {
    if (cardLearnModal) cardLearnModal.classList.remove('open');
    if (cardApplyModal) {
      cardApplyModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  if (cardApplyBtn) cardApplyBtn.addEventListener('click', openCardApplyModal);
  if (cardLearnApplyTrigger) cardLearnApplyTrigger.addEventListener('click', openCardApplyModal);

  if (cardApplyModal && cardApplyClose) {
    cardApplyClose.addEventListener('click', () => {
      cardApplyModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    cardApplyModal.addEventListener('click', (e) => {
      if (e.target === cardApplyModal) {
        cardApplyModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Real-time name engraving sync
  const updateEngravedName = () => {
    if (cardFirstName && cardLastName && cardEngravedName) {
      const full = `${cardFirstName.value.trim()} ${cardLastName.value.trim()}`.trim();
      cardEngravedName.value = full || 'Apple Cardholder';
    }
  };

  if (cardFirstName && cardLastName) {
    cardFirstName.addEventListener('input', updateEngravedName);
    cardLastName.addEventListener('input', updateEngravedName);
  }

  if (btnSubmitCard) {
    btnSubmitCard.addEventListener('click', () => {
      const orig = btnSubmitCard.textContent;
      btnSubmitCard.textContent = '✓ Approved! Added to Apple Wallet';
      btnSubmitCard.style.backgroundColor = '#34c759';
      setTimeout(() => {
        btnSubmitCard.textContent = orig;
        btnSubmitCard.style.backgroundColor = '';
        if (cardApplyModal) {
          cardApplyModal.classList.remove('open');
          document.body.style.overflow = '';
        }
      }, 1200);
    });
  }

  // --------------------------------------------------------------------------
  // 13. Endless Entertainment Service Switcher
  // --------------------------------------------------------------------------
  const servicePills = document.querySelectorAll('.service-pill');
  const serviceCards = document.querySelectorAll('.service-showcase-card');

  servicePills.forEach(pill => {
    pill.addEventListener('click', () => {
      servicePills.forEach(p => p.classList.remove('active'));
      serviceCards.forEach(c => c.classList.remove('active'));

      pill.classList.add('active');
      const targetId = pill.getAttribute('data-target');
      const targetCard = document.getElementById(targetId);
      if (targetCard) {
        targetCard.classList.add('active');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 14. Mobile Footer Directory Accordion
  // --------------------------------------------------------------------------
  const directoryTitles = document.querySelectorAll('.directory-title');
  directoryTitles.forEach(title => {
    title.addEventListener('click', () => {
      if (window.innerWidth <= 833) {
        const section = title.closest('.directory-section');
        if (section) {
          section.classList.toggle('active');
        }
      }
    });
  });

  // Global Close for All Modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('.duo-modal-backdrop.open');
      openModals.forEach(m => m.classList.remove('open'));
      document.body.style.overflow = '';
    }
  });

});
