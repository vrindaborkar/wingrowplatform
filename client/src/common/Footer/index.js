import React from 'react'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'
import { WINGROW_LOGO } from '../../assets/images'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const iconList = [
    {
      id: 0,
      icon: 'pi pi-facebook',
      severity: 'info',
      ariaLabel: 'fb',
      link: 'https://www.facebook.com/',
    },
    {
      id: 1,
      icon: 'pi pi-instagram',
      severity: 'danger',
      ariaLabel: 'insta',
      link: 'https://www.instagram.com/',
    },
    {
      id: 2,
      icon: 'pi pi-linkedin',
      severity: 'info',
      ariaLabel: 'ld',
      link: 'https://www.linkedin.com/feed/',
    },
    {
      id: 3,
      icon: 'pi pi-github',
      severity: 'secondary',
      ariaLabel: 'gh',
      link: 'https://github.com/',
    },
  ]

  const { t } = useTranslation()

  const linkList = [
    { id: 0, label: t('home'), link: '/' },

    { id: 2, label: t('farmer'), link: '/farmers/*' },
    { id: 3, label: t('register'), link: '/register' },
    { id: 1, label: t('customers'), link: '/customer' },
    { id: 4, label: t('stall_bookings'), link: '/subscription' },
    { id: 5, label: t('Terms_of_service'), link: '/terms' },
  ]

  return (
    <>
      <div className='background w-full md:px-8 footer-back'>
        <div className=' grid grid-nogutter w-full md:p-4 px-3'>
          <div className='col-12  md:col-4 mb-2 p-1 text-center  md:text-left'>
            <div className='text-red-600  md:flex  align-items-center '>
              <img
                src={WINGROW_LOGO}
                alt='winagrow_logo.png'
                className='w-5rem'
              />
              <div className='font-bold ml-2 '>
                {t('Footer.company_name')}{' '}
              </div>
            </div>

            <div className='grid grid-nogutter align-items-center'>
              {linkList.map((item, index) => (
                <div key={index} className='col-6'>
                  <Link
                    to={item.link}
                    className=' text-sm text-white py-2 block hover:text-900 text-d-none'>
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className='col-12 md:col-4 mb-2 p-1 text-center'>
            <div className='font-bold text-red-600 '>{t('Footer.address')}</div>
            <p className='text-white'>
              <span className=''> {t('Footer.company_name')} </span>{' '}
              <br />
              {t('Footer.office_address')}
            </p>
            <div>
              <Button
                label='+91 777 600 3700'
                icon='pi pi-phone text-red-600 '
                className='p-1 hover:text-900 bg-transparent border-0 '
                rounded
                onClick={() => window.open('tel:+917776003700')}
              />
              <Button
                label='connect@wingrowagritech.com'
                icon='pi pi-envelope text-red-600'
                className='p-1 hover:text-900 bg-transparent border-0'
                rounded
                size='small'
                onClick={() =>
                  window.open('mailto:connect@wingrowagritech.com')
                }
              />
            </div>
          </div>
          <div className='col-12 md:col-4 mb-2 p-1 text-center'>
            <div className='font-bold text-red-600 '>{t('Footer.about')}</div>
            <p className='text-white'>
              {t('Footer.company_description')}
            </p>
            <div className='text-center flex justify-content-center gap-2'>
              {iconList.map(icon => (
                <Button
                  key={icon.id}
                  icon={icon.icon}
                  onClick={() => window.open(icon.link, '_blank')}
                  className='bg-white border-round-md border-'
                  outlined
                  raised
                  severity={icon.severity}
                  aria-label={icon.ariaLabel}
                />
              ))}
            </div>
          </div>
          <div className='text-center text-xs font-bold mb-0 w-full'>
            &copy; {t('Footer.footer_text')}
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
