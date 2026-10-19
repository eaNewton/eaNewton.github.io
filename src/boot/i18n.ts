import { createI18n, type LocaleMessages } from 'vue-i18n'

type LocaleMessageSchema = {
  [key: string]: string | LocaleMessageSchema
}

const localeModules = import.meta.glob('../locales/*.json', {
  eager: true,
  import: 'default',
})

export const loadLocaleMessages = (): LocaleMessages<LocaleMessageSchema> =>
  Object.fromEntries(
    Object.entries(localeModules).map(([path, messages]) => [
      path.slice('../locales/'.length, -'.json'.length),
      messages,
    ]),
  ) as LocaleMessages<LocaleMessageSchema>

const messages = loadLocaleMessages()
const savedLocale = localStorage.getItem('locale') || 'en'
const locale = savedLocale in messages ? savedLocale : 'en'

export const instance = createI18n({
  legacy: false,
  locale,
  messages,
})
