<script>
  import { page } from "$app/stores";
  import { base } from "$app/paths";

  const links = [
    { href: `${base}/`, label: "Home" },
    { href: `${base}/menu`, label: "Menu" },
    { href: `${base}/contatti`, label: "Contatti" },
  ];
</script>

<nav>
  <div class="inner">
    <a class="logo" href="{base}/">
      DAL <span>CORNUTO</span>
    </a>

    <input id="nav-toggle" type="checkbox" hidden />
    <label class="ham" for="nav-toggle" aria-label="Apri menu">
      <span></span><span></span><span></span>
    </label>

    <ul class="menu">
      {#each links as link}
        <li>
          <a href={link.href} class:active={$page.url.pathname === link.href}>
            {link.label}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</nav>

<style>
  nav {
    position: fixed;
    inset: 0 0 auto;
    z-index: 200;
    background: rgba(255, 255, 255, 0.95);
    border-bottom: 1px solid var(--color-brand-border);
    backdrop-filter: blur(16px);
  }

  .inner {
    width: 100%;
    max-width: var(--site-max-w);
    margin: 0 auto;
    padding: 0 var(--site-px);
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 0;
  }

  .logo {
    font-family: "Anton", sans-serif;
    font-size: 1.65rem;
    letter-spacing: var(--tracking-wide);
    color: var(--color-brand);
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 70%;
  }

  .logo span {
    color: var(--color-text-heading);
  }

  .menu {
    list-style: none;
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0;
  }

  a {
    font-family: "DM Sans", sans-serif;
    font-size: var(--font-size-label);
    letter-spacing: var(--tracking-wider);
    text-transform: uppercase;
    color: var(--color-text-body);
    text-decoration: none;
    position: relative;
    transition: color var(--duration-medium) var(--ease-base);
  }

  a::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--color-brand);
    transition: width var(--duration-slow) var(--ease-base);
  }

  a:hover,
  a.active {
    color: var(--color-brand);
  }

  a.active::after,
  a:hover::after {
    width: 100%;
  }

  .ham {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .ham span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--color-text-body);
    transition:
      transform var(--duration-medium) var(--ease-base),
      opacity var(--duration-medium) var(--ease-base);
  }

  @media (max-width: 768px) {
    .inner {
      padding: 0 var(--site-px);
    }

    .ham {
      display: flex;
      z-index: 210;
    }

    .menu {
      display: flex;
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      width: 100%;
      flex-direction: column;
      gap: 0;
      background: var(--color-surface);
      padding: 0;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.14);
      margin: 0;
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transform: translateY(-10px);
      transition:
        max-height var(--duration-slow) var(--ease-base),
        opacity var(--duration-medium) var(--ease-base),
        transform var(--duration-slow) var(--ease-base);
      box-sizing: border-box;
    }

    #nav-toggle:checked + .ham + .menu {
      max-height: 320px;
      opacity: 1;
      transform: translateY(0);
    }

    .menu li {
      width: 100%;
    }

    a {
      display: block;
      padding: 1rem 1.5rem;
    }

    a::after {
      bottom: 0px;
    }
  }

  @media (max-width: 480px) {
    .inner {
      padding: 0 0.75rem;
    }

    .logo {
      font-size: 1.4rem;
      max-width: 60%;
    }

    .ham span {
      width: 20px;
    }

    a {
      padding: 0.875rem 1.25rem;
    }
  }
</style>