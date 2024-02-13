import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import User from '@models/user';
import { connectToDB } from '@utils/database';

export async function POST(request) {
  try {
    const { email, password, username } = await request.json();
    // validate email and password
    console.log({ email, password, username });


    console.log("Email: ", email);
    // check if user already exists
    const userExists = await User.findOne({ email: email });

    console.log("user: ". userExists)

    // if not, create a new document and save user in MongoDB
    if (!userExists) {

        //connect to the database
        await connectToDB();

        // hash the password
        const hashedPassword = await hash(password, 10);


    // create a new user in the database
      await User.create({
        email: email,
        username: username.replace(" ", "").toLowerCase(),
        password: hashedPassword,
        image: "",
      });
}

else {
  return NextResponse.json({ message: "Username and Email exist" }, { status: 401 });

}

  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}
