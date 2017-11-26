export default {
  'preset': 'stresstest',
  'closed': false,
  'remembered': {
    'Default': {
      '0': {}
    },
    'Normal': {
      '0': {
        'rtt': 1300,
        'jitter': 0,
        'sendWait': 650,
        'timeout': 2700,
        'dropRate': 0.1
      }
    },
    'Slow': {
      '0': {
        'rtt': 1500,
        'jitter': 0,
        'sendWait': 850,
        'timeout': 1850,
        'dropRate': 0.1
      }
    },
    'stresstest': {
      '0': {
        'rtt': 400,
        'jitter': 0,
        'sendWait': 0,
        'timeout': 1850,
        'dropRate': 0
      }
    }
  },
  'folders': {}
}
