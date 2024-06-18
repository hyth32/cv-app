import React, {ChangeEvent, useState} from 'react'

export const useSearch = (
    ref?: React.RefObject<HTMLInputElement>) => {
    const [isActive, setIsActive] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleSearchChange(e, setSearchQuery)
        setIsActive(e.target.value !== '' || searchQuery !== '')
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>, setSearchQuery: (query: string) => void) => {
        const query = event.target.value.replace(/\s+/g, ' ').trimStart()
        setSearchQuery(query)
        const url = new URL(window.location.href)
        query !== '' ? url.searchParams.set('q', query) : url.searchParams.delete('q')
        window.history.replaceState({}, '', url.toString())
    }

    const clearSearchTerm = () => {
        handleSearchChange({target: {value: ''}} as ChangeEvent<HTMLInputElement>, setSearchQuery)
        setIsActive(false)
        ref && ref.current && ref.current.focus()
    }

    return {isActive, searchQuery, setSearchQuery, handleInputChange, clearSearchTerm}
}