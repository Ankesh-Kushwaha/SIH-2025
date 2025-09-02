import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button"; // assuming you're using shadcn/ui

export default function App() {
  return (
    <header>
      <SignedOut>
        <SignInButton >
          <Button>Login</Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
