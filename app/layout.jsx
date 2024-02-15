import Provider from '../components/Provider'
import '../styles/globals.css'

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
                    <div className=''/>
                </div>

                <main className='app font-inter'>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;