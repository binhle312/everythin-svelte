<script lang="ts">
  import { PAGES } from '$lib/constants/page.constant'
  import { page } from '$app/state'

  import Avatar from '$lib/components/Avatar.svelte'

  const user = page.data.user

  interface SidebarItem {
    href: string
    title: string
    icon?: string
    subItems?: SidebarItem[]
  }

  const sidebarItems: SidebarItem[] = [
    {
      title: PAGES.DASHBOARD.title,
      href: PAGES.DASHBOARD.path,
      icon: 'mdi-home',
    },
    {
      title: 'Basic UI Elements',
      icon: 'mdi-crosshairs-gps',
      href: '/basic-ui-elements',
      subItems: [
        { title: PAGES.FORMS.title        , href: PAGES.FORMS.path          },
        { title: PAGES.ICONS.title        , href: PAGES.ICONS.path          },
        { title: PAGES.CHARTS.title       , href: PAGES.CHARTS.path         },
        { title: PAGES.TABLES.title       , href: PAGES.TABLES.path         },
        { title: PAGES.BUTTONS.title      , href: PAGES.BUTTONS.path        },
        { title: PAGES.DROPDOWNS.title    , href: PAGES.DROPDOWNS.path      },
        { title: PAGES.TYPOGRAPHY.title   , href: PAGES.TYPOGRAPHY.path     },
        { title: PAGES.DOCUMENTATION.title, href: PAGES.DOCUMENTATION.path  },
      ],
    },
    {
      title: PAGES.COUNTER.title,
      href: PAGES.COUNTER.path,
      icon: 'mdi-alarm',
    },
    {
      title: PAGES.EMPLOYEES.title,
      href: PAGES.EMPLOYEES.path,
      icon: 'mdi-account-group',
    },
    // {
    //   title: PAGES.ASSISTANCE.title,
    //   href: PAGES.ASSISTANCE.path,
    //   icon: 'mdi-robot',
    // },
  ]
</script>

<nav class="sidebar sidebar-offcanvas" id="sidebar">
  <ul class="nav">
    <li class="nav-item nav-profile">
      <a href="#" class="nav-link">
        <div class="nav-profile-image">
          <!-- <img src="/images/faces/face1.jpg" alt="profile" /> -->
          <Avatar fullName={user.fullName} size={45} />
          <span class="login-status online"></span>
          <!--change to offline or busy as needed-->
        </div>
        <div class="nav-profile-text d-flex flex-column">
          <span class="font-weight-bold mb-2">{user.fullName}</span>
          <span class="text-secondary text-small">{user.email}</span>
        </div>
        <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
      </a>
    </li>
    {#each sidebarItems as item}
      <li class="nav-item" class:active={item.subItems
        ? page.url.pathname.startsWith(item.href)
        : (page.url.pathname === item.href)}
      >
        <a
          class="nav-link"
          href={item.subItems ? item.href.replace("/", "#") : item.href}
          aria-controls={item.subItems ? item.href.replace("/", "") : undefined}
          aria-expanded={item.subItems ? "false" : undefined}
          data-bs-toggle={item.subItems ? "collapse" : undefined}
        >
          <span class="menu-title">{item.title}</span>
          {#if item.subItems}<i class="menu-arrow"></i>{/if}
          <i class="mdi menu-icon {item.icon}"></i>
        </a>
        {#if item.subItems}
          <div class="collapse" id={item.href.replace("/", "")}>
            <ul class="nav flex-column sub-menu">
              {#each item.subItems as subItem}
                <li class="nav-item">
                  <a
                    class="nav-link"
                    class:active={page.url.pathname === subItem.href}
                    href={subItem.href}
                  >
                    {subItem.title}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </li>
    {/each}
  </ul>
</nav>
