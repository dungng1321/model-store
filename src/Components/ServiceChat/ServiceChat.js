import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import OutsideClickHandler from 'react-outside-click-handler';
import './ServiceChat.css'

function ServiceChat() {


    //scroll 
    const [closeChatIcon, setCloseChatIcon] = useState(false)


    //scroll event when not not close
    const [scroll, setScroll] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 250) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    }

    useEffect(() => {
        if (closeChatIcon === false) {
            window.addEventListener('scroll', handleScroll);
        } else {
            setScroll(false);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [closeChatIcon])

    //scroll event when closed
    const [scrollOpen, setScrollOpen] = useState(false)

    const handleScrollOpen = () => {
        if (window.scrollY > 250) {
            setScrollOpen(true);
        } else {
            setScrollOpen(false);
        }
    }

    useEffect(() => {
        if (closeChatIcon === true) {
            window.addEventListener('scroll', handleScrollOpen);
        } else {
            setScrollOpen(false);
        }

        return () => {
            window.removeEventListener('scroll', handleScrollOpen)
        }
    }, [closeChatIcon])

    const service = {
        visible: {
            opacity: 1, x: 0, transition: {
                ease: "easeOut",
                duration: 0.3
            }
        },
        hidden: {
            opacity: 0, x: "150%", transition: {
                ease: "easeOut",
                duration: 0.3
            }
        }
    }

    //handle close icon chat
    const handleCloseChat = () => {
        setCloseChatIcon(true)
        setScroll(false);
        setScrollOpen(true);
    }

    //handle open icon chat
    const handleOpenChat = () => {
        setCloseChatIcon(false)
        setScroll(true);
        setScrollOpen(false);

    }

    //handle open to begin chat
    const [openModalChat, setOpenModalChat] = useState(false)
    const handleOpenModal = () => {
        setOpenModalChat(true)
    }

    // get current date times

    var date = new Date()
    var today = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    var currentTime = date.getHours() + ":" + date.getMinutes();

    // =========================
    return (
        <>
            <AnimatePresence>
                {(scrollOpen && closeChatIcon) && <motion.div
                    variants={service}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="open-chat-icon" onClick={() => handleOpenChat()}>
                    <div className="chat-reOpen">
                        <QuestionAnswerIcon className="icon" />
                    </div>

                </motion.div>}
            </AnimatePresence>

            <AnimatePresence >
                {scroll && <motion.div
                    variants={service}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="service-chat">

                    {!openModalChat && <div className="close-chat-icon" onClick={() => handleCloseChat()}>
                        <span>&times;</span>
                    </div>}

                    <div className="service-chat-wrapper" onClick={() => handleOpenModal()}></div>

                    <AnimatePresence>
                        {openModalChat && (
                            <OutsideClickHandler onOutsideClick={() => setOpenModalChat(false)}>
                                <motion.div
                                    initial={{ opacity: 0, y: '150%', transition: { type: 'spring', bounce: 0.25 } }}
                                    animate={{ opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.25 } }}
                                    exit={{ opacity: 0, y: '150%', transition: { type: 'spring', bounce: 0.25 } }}
                                    className="service-chat-container">

                                    <div className="service-chat-header">
                                        <div className="inner-header">
                                            <div style={{ display: 'flex' }}>
                                                <div className="header-avatar"></div>

                                                <div className="header-name">
                                                    <p style={{ fontWeight: 'bold' }}>FIGIMAN</p>
                                                    <p>Chăm sóc khách hàng</p>
                                                </div>
                                            </div>

                                            <div className="header-close" onClick={() => setOpenModalChat(false)}>
                                                <ExpandMoreIcon />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="service-chat-body">
                                        <div className="inner-body">
                                            <div className="body-date">{today}</div>
                                            <div className="body-message">
                                                <div className="avatar-warp">
                                                    <div className="avatar"></div>
                                                </div>
                                                <div className="messages">
                                                    <div className="mess">Chào bạn :D</div>
                                                    <div className="mess">Figiman làm việc từ 7AM-22PM từ thứ Hai đến thứ Bảy.
                                                        Những ngày còn lại như cuối tuần, ngày lễ có thể phản hồi
                                                        sẽ bị chậm trễ do thiếu nhân viên nhưng chúng mình sẽ cố hết sức để hỗ
                                                        trợ các bạn.
                                                    </div>
                                                    <div className="mess">Figiman có thể giúp gì cho bạn?</div>


                                                </div>
                                            </div>
                                            <div className="body-time">{currentTime}</div>

                                        </div>
                                    </div>
                                    <div className="service-chat-bottom">
                                        <div className="inner-bottom">
                                            <div style={{ display: 'flex' }}>
                                                <input type="text" placeholder="Aa" />
                                                <SendIcon className="send-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </OutsideClickHandler>
                        )}

                    </AnimatePresence>


                </motion.div>}
            </AnimatePresence>
        </>

    )
}

export default ServiceChat