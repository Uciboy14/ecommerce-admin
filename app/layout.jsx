import Provider from '@components/Provider'
import '@styles/globals.css'

export const metadata = {
    title: "ItHardwarePart",
    description: "Where your hardwares are sold"
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient'/>
                </div>

                <main className='app'>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;