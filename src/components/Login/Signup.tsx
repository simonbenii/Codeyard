"use client";

import "@/styles/login.css";
import Image from "next/image";
import useFormattedMessage from "@/hooks/useFormatMessage";
import React, { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CircleIcon from "@mui/icons-material/Circle";
import zxcvbn from "zxcvbn";

export default function Signup() {
  const { formatMessage } = useFormattedMessage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const passwordStrength = zxcvbn(password);
  const strengthScore = passwordStrength.score;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage(formatMessage("invalid-email-format"));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(formatMessage("signup-success"));
      } else {
        switch (data.message) {
          case "MISSING":
            setErrorMessage(formatMessage("missing-fields"));
            break;
          default:
            setErrorMessage(data.message || formatMessage("signup-error"));
            break;
        }
      }
    } catch (error) {
      console.error("API hiba:", error);
      setErrorMessage(formatMessage("signup-error"));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
      <div className="left">
        <div className="left-card">
          <h1>{formatMessage("welcome")}</h1>
          <h6 style={{ paddingBlockEnd: "4vh" }}>
            {formatMessage("welcome-registration-title")}
          </h6>
          <Box width="80%" mt={0}>
            <TextField
              fullWidth
              variant="standard"
              label={formatMessage("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={textFieldStyles}
            />

            <TextField
              fullWidth
              variant="standard"
              label={formatMessage("password")}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={textFieldStyles}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box display="flex" paddingBottom={2} alignItems="center">
                      <IconButton
                        style={{ color: "#d4d4d4" }}
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                      <Box
                        display="flex"
                        flexDirection="column-reverse"
                        gap={0.5}
                        alignItems="center"
                        ml={1}
                      >
                        {[...Array(4)].map((_, index) => (
                          <span
                            key={index}
                            className={`password-strength-point ${
                              index < strengthScore ? "active" : ""
                            }`}
                          ></span>
                        ))}
                      </Box>
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
            {errorMessage && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {errorMessage}
              </div>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CircleIcon />}
                  sx={{
                    color: "#4A90E2",
                    "&.Mui-checked": {
                      color: "#4A90E2",
                    },
                  }}
                />
              }
              label={formatMessage("remember-me")}
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontFamily:
                    "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "#A1A1A1",
                },
              }}
            />
          </Box>
          <div
            style={{
              width: "100%",
              marginTop: "2vh",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              className="registration-button"
              onClick={handleSignup}
              disabled={isLoading}
            >
              {isLoading
                ? formatMessage("loading")
                : formatMessage("signup-button")}
            </button>
          </div>
        </div>
        <div className="footer">
          <p className="copyright">{formatMessage("copyright")}</p>
          <a href="terms" className="terms">
            {formatMessage("terms")}
          </a>
          <a href="privacy" className="privacy">
            {formatMessage("privacy")}
          </a>
          <a href="more" className="more">
            ···
          </a>
        </div>
      </div>

      <div className="right">
        <div className="background-blur"></div>
        <div className="content">
          <div className="content-box">
            <Image src="/acme.png" alt="Logo" width={91} height={53} priority />
            <h2>{formatMessage("have-account-title")}</h2>
            <h4>{formatMessage("have-account-description")}</h4>
            <a href="/login">
              <button className="login-button">
                {formatMessage("login-button")}
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable stílus objektum
const textFieldStyles = {
  fontFamily:
    "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto",
  fontSize: "14px",
  lineHeight: "17px",
  color: "#757575",
  paddingBlockEnd: "2vh",
  "& .MuiInput-underline:after": {
    borderBottomColor: "#4a90e2",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#D4D4D4",
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: "#A1A1A1",
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: "#4a90e2",
  },
};
