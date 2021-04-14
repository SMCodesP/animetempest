import { ptBR } from 'date-fns/locale'

const formatRelativeLocale = {
  yesterday: "'ontem às' p",
  today: "'hoje às' p",
  tomorrow: "'amanhã às' p",
  nextWeek: "eeee 'às' p",
  lastWeek: 'HH:mm:ss - dd/MM/yy',
  other: 'HH:mm:ss - dd/MM/yy',
}

export default {
  ...ptBR,
  formatRelative: (
    token:
      | 'lastWeek'
      | 'today'
      | 'yesterday'
      | 'tomorrow'
      | 'nextWeek'
      | 'other'
  ) => {
    return formatRelativeLocale[token]
  },
}
