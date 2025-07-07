interface PageConfig {
  path: string
  title: string
}

export const PAGES: Record<string, PageConfig> = Object.freeze({
  LOGIN         : { path: '/auth/login'                     , title: 'Login'          },
  REGISTER      : { path: '/auth/register'                  , title: 'Register'       },
  DASHBOARD     : { path: '/'                               , title: 'Dashboard'      },
  BUTTONS       : { path: '/basic-ui-elements/buttons'      , title: 'Buttons'        },
  DROPDOWNS     : { path: '/basic-ui-elements/dropdowns'    , title: 'Dropdowns'      },
  TYPOGRAPHY    : { path: '/basic-ui-elements/typography'   , title: 'Typography'     },
  ICONS         : { path: '/basic-ui-elements/icons'        , title: 'Icons'          },
  FORMS         : { path: '/basic-ui-elements/forms'        , title: 'Forms'          },
  CHARTS        : { path: '/basic-ui-elements/charts'       , title: 'Charts'         },
  TABLES        : { path: '/basic-ui-elements/tables'       , title: 'Tables'         },
  DOCUMENTATION : { path: '/basic-ui-elements/documentation', title: 'Documentation'  },
  COUNTER       : { path: '/counter'                        , title: 'Counter'        },
  // EMPLOYEES     : { path: '/employees'                      , title: 'Employees'      },
  // ASSISTANCE    : { path: '/assistance'                     , title: 'Assistance'     },
})
