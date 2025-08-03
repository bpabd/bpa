// Validate and convert date strings
export const safeDateConversion = (dateString) => {
  if (!dateString) return null
  
  try {
    const date = new Date(dateString)
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string:', dateString)
      return null
    }
    return date
  } catch (error) {
    console.error('Date conversion error:', error)
    return null
  }
}

// Format date for display
export const formatDateDisplay = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}