import { Dialog } from '@headlessui/react'

type Props = {
    isOpen: boolean
    message: string
    onCancel: () => void
    onConfirm: () => void
}

export default function ConfirmDialog({ isOpen, message, onCancel, onConfirm }: Props) {
    return (
        <Dialog open={isOpen} onClose={onCancel} className="fixed z-50 inset-0 flex items-center justify-center bg-black/30">
            <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center space-y-4">
                <Dialog.Title className="text-lg font-semibold text-purple-800">{message}</Dialog.Title>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-medium"
                    >
                        Confirmar
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
                    >
                        Cancelar
                    </button>
                </div>
            </Dialog.Panel>
        </Dialog>
    )
}
