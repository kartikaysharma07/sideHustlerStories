"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

// Animation variants for framer-motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function SignInClient() {
  const searchParams = useSearchParams();
  const callbackUrl = useMemo(
    () => searchParams.get("callbackUrl") || "/",
    [searchParams]
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = useCallback(async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl });
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [callbackUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background gradient-bg particle-bg relative overflow-hidden">
      {/* Particle effects */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
          }}
        />
      ))}
      <motion.div
        className="container mx-auto px-4 py-12 max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="card-gradient border-0 shadow-lg card-hover">
          <CardHeader className="text-center">
            <motion.div variants={itemVariants}>
              <CardTitle className="text-3xl font-bold animate-fade-up">
                Welcome Back
              </CardTitle>
              <p className="text-muted-foreground mt-2 animate-fade-up animate-delay-100">
                Sign in to explore side hustle opportunities
              </p>
            </motion.div>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <motion.div variants={itemVariants} className="animate-fade-up animate-delay-200">
              <Button
                onClick={handleSignIn}
                disabled={isLoading}
                className="w-full max-w-xs rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 py-6 text-lg"
                aria-label="Sign in with Google"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Image
                      src="/google-logo.svg"
                      alt="Google logo"
                      width={20}
                      height={20}
                      priority
                    />
                    Sign in with Google
                  </>
                )}
              </Button>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="text-sm text-muted-foreground animate-fade-up animate-delay-300"
            >
              By signing in, you agree to our{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}