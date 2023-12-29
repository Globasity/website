/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api/apiRequest';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import NotifySnackbar from '../snackbar/notiySnackbar';
import { Eye, EyeOff } from 'react-feather';

const NewPassword = ({ onNextStep }) => {
  const [isLoading, setIsLoading] = useState()
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userRecover = JSON.parse(window.localStorage.getItem('globasity_reset_password'))
  const { t } = useTranslation()
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (newPassword === confirmPassword) {
      setIsLoading(true)
      const body = new FormData()
      body.append('type', 'update_password')
      body.append('user_id', userRecover?.user_id)
      body.append('password', newPassword)
      apiRequest({ body })
        .then((result) => {
          if (result.result) {
            toast.success(result.message)
            e.target.reset()
            window.localStorage.removeItem('globasity_reset_password')
            navigate('/login')
          } else {
            toast.error(result.message)
          }
          setIsLoading(false)
        }).catch((err) => {
          console.log(err)
          setIsLoading(false)
        });
    } else {
      setMessage('password are not match! please try again')
      setMessageType('error')
      setOpen(true)
    }

  }
  useEffect(() => {
    if (newPassword === '') {
      setShowPassword(false)
    }
    if (confirmPassword === '') {
      setShowPassword2(false)
    }
  }, [newPassword, confirmPassword]);
  return (
    <div>
      <NotifySnackbar handleClose={handleClose} open={open} message={message} messageType={messageType} />
      <Container fluid="xxl" className="px-0">
        <section className="px-sm-3 d-flex align-items-center justify-content-center">
          <div className="login_card">
            <div>
              <div className="heading text-center">{t("Change_Password")}</div>
              <div className="fs_07 text-center">
                {t("enter_new_pass_des")}
              </div>
              <div className="fs_07 text-center"></div>
            </div>
            <Form className="w-100 mt-4" onSubmit={handleSubmit}>
              <div className="d-flex flex-column contact_inputs gap-1 register mb-3">
                <Form.Label className="ps-2">{t("Enter_New_Password")}</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder={t("Enter_New_Password")}
                    style={{ fontSize: "14px" }}
                    value={newPassword}
                    className='mb-0'
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {newPassword &&
                    <div className="position-absolute eyeOff">
                      {showPassword && <EyeOff className="eyeShow" onClick={handleTogglePassword} />}
                      {!showPassword && <Eye className="eyeShow" onClick={handleTogglePassword} />}
                    </div>}
                </div>
              </div>
              <div className="d-flex flex-column contact_inputs gap-1 register mb-3">
                <Form.Label className="ps-2">{t('CON_PASS')}</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword2 ? "text" : "password"}
                    placeholder={t('CON_PASS')}
                    style={{ fontSize: "14px" }}
                    value={confirmPassword}
                    className='mb-0'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {confirmPassword &&
                    <div className="position-absolute eyeOff">
                      {showPassword2 && <EyeOff className="eyeShow" onClick={handleTogglePassword2} />}
                      {!showPassword2 && <Eye className="eyeShow" onClick={handleTogglePassword2} />}
                    </div>}
                </div>
              </div>
              <div className="mb-4">
                <div className="d-flex">
                  <button
                    disabled={isLoading ? true : false}
                    type="submit"
                    className="btn1 btn2 mx-auto fs_09 btn_primary rounded_3 px-3 py-2"
                  >
                    {isLoading ? (
                      <Spinner animation="border" variant="light" size="sm" />
                    ) : (
                      t("BTN_SUBMIT")
                    )}
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </section>
      </Container>
    </div>
  )
}

export default NewPassword
