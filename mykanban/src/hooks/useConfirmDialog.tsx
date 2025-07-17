import { useState } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'

type ConfirmOptions = {
    message: string
    onConfirm: () => void
}

export function useConfirmDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const [options, setOptions] = useState<ConfirmOptions | null>(null)

    function confirm({ message, onConfirm }: ConfirmOptions) {
        setOptions({ message, onConfirm })
        setIsOpen(true)
    }

    function handleConfirm() {
        if (options?.onConfirm) options.onConfirm()
        setIsOpen(false)
        setOptions(null)
    }

    function handleCancel() {
        setIsOpen(false)
        setOptions(null)
    }

    const ConfirmDialogElement = options && (
        <ConfirmDialog
            isOpen={isOpen}
            message={options.message}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        />
    )

    return { confirm, ConfirmDialogElement }
}
