export const getFilterConfig = (item) => {
  switch (item) {
    case 'all':
      return {
        category: 'all',
        status: 'all',
        search: '',
        priority: 'all',
        time: 'all',
        tags: [],
        partners: [],
        sort: 'date-desc',
      };
    case 'completed':
      return {
        category: 'all',
        status: 'completed',
        search: '',
        priority: 'all',
        time: 'all',
        tags: [],
        partners: [],
        sort: 'date-desc',
      };
    case 'high':
      return {
        category: 'all',
        status: 'all',
        search: '',
        priority: 'high',
        time: 'all',
        tags: [],
        partners: [],
        sort: 'date-desc',
      };
    case 'today':
      return {
        category: 'all',
        status: 'all',
        search: '',
        priority: 'all',
        time: 'today',
        tags: [],
        partners: [],
        sort: 'date-desc',
      };
    case 'upcoming':
      return {
        category: 'all',
        status: 'all',
        search: '',
        priority: 'all',
        time: 'upcoming',
        tags: [],
        partners: [],
        sort: 'date-desc',
      };
    case 'recent':
      return {
        category: 'all',
        status: 'all',
        search: '',
        priority: 'all',
        time: 'recent',
        tags: [],
        partners: [],
        sort: 'date-desc',
      };
    case 'active':
      return {
        category: 'all',
        status: 'active',
        search: '',
        priority: 'all',
        time: 'all',
        tags: [],
        partners: [],
        sort: 'date-desc',
      };
    case 'calendar':
      return {
        category: 'calendar',
        status: 'all',
        search: '',
        priority: 'all',
        time: 'all',
        tags: [],
        partners: [],
        sort: 'date-desc',
      };

    default:
      return {
        category: 'all',
        status: 'all',
        search: '',
        priority: 'all',
        time: 'all',
        tags: [],
        partners: [],
        sort: 'date-desc',
      };
  }
};
