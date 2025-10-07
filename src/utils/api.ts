import { projectId, publicAnonKey } from './supabase/info'

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9e948f6c`

// Store auth token globally
let authToken: string | null = null

export const setAuthToken = (token: string | null) => {
  authToken = token
}

export const getAuthToken = () => authToken

const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken || publicAnonKey}`,
    ...options.headers
  }

  const config: RequestInit = {
    ...options,
    headers
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      console.error(`API Error (${response.status}):`, data)
      throw new Error(data.error || `HTTP ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('API call failed:', error)
    throw error
  }
}

// Auth API
export const authAPI = {
  getMe: async () => {
    return apiCall('/auth/me')
  }
}

// Borrowers API
export const borrowersAPI = {
  getAll: async () => {
    return apiCall('/borrowers')
  },

  getById: async (id: string) => {
    return apiCall(`/borrowers/${id}`)
  },

  create: async (borrowerData: {
    name: string
    email: string
    phone: string
    address: string
    creditScore: number
  }) => {
    return apiCall('/borrowers', {
      method: 'POST',
      body: JSON.stringify(borrowerData)
    })
  },

  update: async (id: string, updates: any) => {
    return apiCall(`/borrowers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
  },

  delete: async (id: string) => {
    return apiCall(`/borrowers/${id}`, {
      method: 'DELETE'
    })
  }
}

// Loans API
export const loansAPI = {
  getAll: async () => {
    return apiCall('/loans')
  },

  getById: async (id: string) => {
    return apiCall(`/loans/${id}`)
  },

  create: async (loanData: {
    borrowerId: string
    amount: number
    interestRate: number
    term: number
    startDate: string
  }) => {
    return apiCall('/loans', {
      method: 'POST',
      body: JSON.stringify(loanData)
    })
  },

  update: async (id: string, updates: any) => {
    return apiCall(`/loans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
  }
}

// Repayments API
export const repaymentsAPI = {
  getAll: async () => {
    return apiCall('/repayments')
  },

  create: async (repaymentData: {
    loanId: string
    amount: number
    paymentDate: string
    paymentMethod: string
  }) => {
    return apiCall('/repayments', {
      method: 'POST',
      body: JSON.stringify(repaymentData)
    })
  }
}

// Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    return apiCall('/dashboard/stats')
  },

  initSampleData: async () => {
    return apiCall('/init-sample-data', {
      method: 'POST'
    })
  }
}

// Health check
export const healthCheck = async () => {
  return apiCall('/health')
}