export const appRoutes = [
  {
    path: '/log-in',
    name: 'login',
    loginRequired: false,
    roles: {
      guest: {
        template: 'Login',
        pageKey: 'auth',
        translations: ['login'],
        prefetchNext: ['/dashboard']
      }
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    loginRequired: false,
    roles: {
      guest: {
        template: 'SignUp',
        pageKey: 'register',
        translations: ['register'],
        prefetchNext: [
          '/dashboard',
          '/dashboard/kyc-verification',
          '/dashboard/step-2'
        ]
      }
    }
  },
  {
    path: '/verify',
    name: 'EmailVerification',
    loginRequired: false,
    roles: {
      guest: {
        template: 'EmailVerification',
        pageKey: 'verify',
        translations: ['verify']
      }
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    loginRequired: false,
    roles: {
      guest: {
        template: 'ForgotPassword',
        pageKey: 'forgot-password',
        translations: ['forgot-password']
      }
    }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    loginRequired: false,
    roles: {
      guest: {
        template: 'ResetPassword',
        pageKey: 'reset-password',
        translations: ['reset-password']
      }
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    loginRequired: true,
    roles: {
      fan: {
        template: 'FanDashboard',
        pageKey: 'dashboard.fan',
        translations: [
          'dashboard',
          'common/fan'
        ]
      },
      creator: {
        template: 'CreatorDashboard',
        pageKey: 'dashboard.creator',
        translations: [
          'dashboard',
          'common/creator'
        ]
      },
      vendor: {
        template: 'VendorDashboard',
        pageKey: 'dashboard.vendor',
        translations: [
          'dashboard',
          'common/vendor'
        ]
      }
    }
  },
  {
    path: '/dashboard/edit-profile',
    name: 'edit-profile',
    loginRequired: true,
    roles: {
      fan: {
        template: 'FanEditProfile',
        pageKey: 'dashboard.edit-profile.fan',
        translations: [
          'dashboard/edit-profile',
          'common/fan'
        ]
      },
      creator: {
        template: 'CreatorEditProfile',
        pageKey: 'dashboard.edit-profile.creator',
        translations: [
          'dashboard/edit-profile',
          'common/creator'
        ]
      }
    }
  },
  {
    path: '/dashboard/user-info',
    name: 'user-info',
    loginRequired: true,
    roles: {
      fan: {
        template: 'FanUserInfo',
        pageKey: 'dashboard.user-info.fan',
        translations: [
          'dashboard/user-info',
          'common/fan'
        ]
      }
    }
  },
  {
    path: '/dashboard/kyc-verification',
    name: 'kyc-verification',
    loginRequired: true,
    roles: {
      fan: {
        template: 'FanKYCVerification',
        pageKey: 'dashboard.kyc.fan',
        translations: [
          'dashboard/kyc',
          'common/fan'
        ]
      },
      creator: {
        template: 'CreatorKYCVerification',
        pageKey: 'dashboard.kyc.creator',
        translations: [
          'dashboard/kyc',
          'common/creator'
        ]
      }
    }
  },
  {
    path: '/dashboard/step-2',
    name: 'step-2',
    loginRequired: true,
    roles: {
      fan: {
        template: 'FanStep2',
        pageKey: 'dashboard.step2.fan',
        translations: [
          'dashboard/step2',
          'common/fan'
        ]
      }
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    loginRequired: false,
    roles: {
      guest: {
        template: 'NotFound',
        pageKey: 'not-found',
        translations: ['not-found']
      }
    }
  }
];
