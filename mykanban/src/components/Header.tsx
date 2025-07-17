import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import logo from '../assets/logowhite.png'
import { BellIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import NotificationCard from './NotificationCard' // ajuste o caminho conforme onde estiver

const navigation = [
    { name: 'Dashboard', href: '/', current: true },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const [showNotifications, setShowNotifications] = useState(false)

    return (
        <Disclosure as="nav" className="bg-gradient-to-r from-purple-800 to-purple-900 w-full shadow-md relative">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <img src={logo} alt="Logo" className="h-10 w-auto" />
                        <div className="hidden sm:flex space-x-4">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current
                                            ? 'text-white font-medium'
                                            : 'text-white/80 hover:text-white',
                                        'text-sm px-3 py-2 rounded-md transition'
                                    )}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Botão do sino + notificações */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="rounded-full bg-purple-700 p-1 text-white hover:bg-purple-600 transition focus:ring-2 focus:ring-white"
                        >
                            <span className="sr-only">Notificações</span>
                            <BellIcon className="h-6 w-6" />
                        </button>

                        {/* Dropdown de notificações */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 p-4">
                                <NotificationCard
                                    title="Nova oportunidade"
                                    description="Tem um estágio novo com seu perfil!"
                                    time="há 2h"
                                    onClick={() => alert("Abrir detalhes")}
                                />
                                <NotificationCard
                                    title="Atualização"
                                    description="Sua tarefa 'Estilizar tela' foi movida para 'Concluído'"
                                    time="há 1h"
                                    onClick={() => alert("Abrir tarefa")}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={classNames(
                                item.current
                                    ? 'bg-purple-900 text-white'
                                    : 'text-white/80 hover:bg-purple-800 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
